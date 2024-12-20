const { LoThuoc } = require("../models/LoThuoc");
const { Thuoc } = require("../models/Thuoc");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

// Tạo lô thuốc mới
const createLoThuoc = async (req, res) => {
  const { NgayNhap, TongTien, ThuocData } = req.body;
  console.log(ThuocData);

  // Kiểm tra dữ liệu đầu vào
  if (!Array.isArray(ThuocData)) {
    return res.status(400).json({
      success: false,
      message: "ThuocData phải là một mảng.",
    });
  }

  try {
    // Tạo lô thuốc mới
    const loThuoc = await LoThuoc.create({
      NgayNhap,
      TongTien,
    });

    // Thêm thuốc vào lô thuốc
    for (let i = 0; i < ThuocData.length; i++) {
      // Sử dụng ThuocData để chuẩn bị dữ liệu thuốc
      const thuocData = {
        LoThuocID: loThuoc.LoThuocID,
        TenThuoc: ThuocData[i].TenThuoc,
        GiaTienNhap: ThuocData[i].GiaTienNhap,
        GiaTienBan:
          ThuocData[i].GiaTienNhap + (ThuocData[i].GiaTienNhap / 100) * 5,
        SoLuong: ThuocData[i].SoLuong,
        NgaySanXuat: ThuocData[i].NgaySanXuat,
        HanSuDung: ThuocData[i].HanSuDung,
      };

      // Kiểm tra nếu thuốc đã tồn tại trong bảng Thuoc
      const existingThuoc = await Thuoc.findOne({
        where: {
          TenThuoc: ThuocData[i].TenThuoc,
        },
      });

      if (existingThuoc) {
        // Nếu thuốc đã tồn tại, tạo một bản sao mới của thuốc với LoThuocID mới
        await Thuoc.create({
          ...thuocData,
          ThuocID: existingThuoc.ThuocID,
        });
        console.log(
          `Thuốc ${ThuocData[i].TenThuoc} đã được tạo bản sao mới với LoThuocID ${loThuoc.LoThuocID}.`
        );
      } else {
        // Nếu thuốc chưa tồn tại, tạo mới thuốc
        await Thuoc.create(thuocData);
        console.log(`Thuốc ${ThuocData[i].TenThuoc} đã được tạo mới.`);
      }
    }

    // Trả về phản hồi thành công
    res.json({ success: true });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi tạo lô thuốc.",
      error: error.message,
    });
  }
};

// Hàm để lấy danh sách thuốc đã hết hạn và sắp hết hạn
const getCanhBaoHanSuDung = async (req, res) => {
  const currentDate = new Date();
  const warningDate = new Date();
  warningDate.setMonth(warningDate.getMonth() + 6);

  try {
    const thuocDaHetHan = await Thuoc.findAll({
      where: {
        HanSuDung: {
          [Op.lt]: currentDate,
        },
      },
    });

    const thuocSapHetHan = await Thuoc.findAll({
      where: {
        HanSuDung: {
          [Op.between]: [currentDate, warningDate],
        },
      },
    });

    res.render("canhbaohansudung", { thuocDaHetHan, thuocSapHetHan });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getListLoThuoc = (req, res) => {
  LoThuoc.findAll()
    .then((listLoThuocs) => {
      res.render("quanlylothuoc", { listLoThuocs });
    })
    .catch((err) => {
      res.render("quanlylothuoc", { error: err.message });
    });
};

const getAllThuoc = async () => {
  try {
    const currentDate = new Date();
    return await Thuoc.findAll({
      where: {
        SoLuong: {
          [Sequelize.Op.gt]: 0,
        },
        HanSuDung: {
          [Op.gte]: currentDate,
        },
      },
      order: [
        ["TenThuoc", "ASC"],
        ["HanSuDung", "ASC"],
      ],
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách thuốc:", error);
    throw new Error("Không thể lấy danh sách thuốc");
  }
};

const listthuoc = async (req, res) => {
  try {
    const currentDate = new Date();
    const listthuoc = await Thuoc.findAll({
      where: {
        SoLuong: {
          [Sequelize.Op.gt]: 0,
        },
        HanSuDung: {
          [Op.gte]: currentDate,
        },
      },
      order: [
        ["TenThuoc", "ASC"],
        ["HanSuDung", "ASC"],
      ],
    });
    res.render("quanlythuoc", { listthuoc });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
module.exports = {
  createLoThuoc,
  getCanhBaoHanSuDung,
  getListLoThuoc,
  getAllThuoc,
  listthuoc,
};

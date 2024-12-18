const { LoThuoc } = require("../models/LoThuoc");
const { Thuoc } = require("../models/Thuoc");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

// Tạo lô thuốc mới
const createLoThuoc = async (req, res) => {
  const { NgayNhap, ThuocList } = req.body;
  if (!NgayNhap || !Array.isArray(ThuocList) || ThuocList.length === 0) {
    return res.json({
      success: false,
      message: "Ngày nhập và danh sách thuốc không được để trống",
    });
  }

  const transaction = await sequelize.transaction();
  try {
    // Tạo lô thuốc mới
    const newLoThuoc = await LoThuoc.create(
      {
        NgayNhap,
        TongTien: 0,
      },
      { transaction }
    );

    let totalCost = 0;

    // Thêm từng thuốc vào lô
    for (const thuoc of ThuocList) {
      const {
        TenThuoc,
        HanSuDung,
        SoLuong,
        NgaySanXuat,
        GiaTienNhap,
        GiaTienNBan,
      } = thuoc;

      if (
        !TenThuoc ||
        !HanSuDung ||
        !SoLuong ||
        !NgaySanXuat ||
        !GiaTienNhap ||
        !GiaTienNBan
      ) {
        throw new Error("Thông tin thuốc không hợp lệ");
      }

      totalCost += GiaTienNhap * SoLuong;

      // Kiểm tra thuốc đã tồn tại theo tên
      const existingThuoc = await Thuoc.findOne({
        where: { TenThuoc },
      });

      if (existingThuoc) {
        // Cập nhật thông tin thuốc nếu tên trùng
        await existingThuoc.update(
          {
            LoThuocID: newLoThuoc.LoThuocID,
            HanSuDung,
            SoLuong,
            NgaySanXuat,
            GiaTienNhap,
            GiaTienNBan,
          },
          { transaction }
        );
      } else {
        // Thêm thuốc mới nếu không trùng tên
        await Thuoc.create(
          {
            LoThuocID: newLoThuoc.LoThuocID,
            TenThuoc,
            HanSuDung,
            SoLuong,
            NgaySanXuat,
            GiaTienNhap,
            GiaTienNBan,
          },
          { transaction }
        );
      }
    }

    // Cập nhật tổng tiền của lô thuốc
    await newLoThuoc.update({ TongTien: totalCost }, { transaction });

    await transaction.commit();
    res.json({
      success: true,
      data: newLoThuoc,
      message: "Tạo lô thuốc thành công",
    });
  } catch (error) {
    await transaction.rollback();
    res.json({
      success: false,
      error: error.message,
      message: "Tạo lô thuốc thất bại",
    });
  }
};

// Hiển thị chi tiết lô thuốc
const getLoThuocDetails = async (req, res) => {
  const { LoThuocID } = req.params;

  try {
    const loThuoc = await LoThuoc.findByPk(LoThuocID, {
      include: [
        {
          model: Thuoc,
          as: "ThuocList",
        },
      ],
    });

    if (!loThuoc) {
      return res.json({
        success: false,
        message: "Không tìm thấy lô thuốc",
      });
    }

    res.json({
      success: true,
      data: loThuoc,
      message: "Lấy thông tin lô thuốc thành công",
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      message: "Lấy thông tin lô thuốc thất bại",
    });
  }
};

// Hàm để lấy danh sách thuốc đã hết hạn và sắp hết hạn
const getCanhBaoHanSuDung = async (req, res) => {
  const currentDate = new Date();
  const warningDate = new Date();
  warningDate.setMonth(warningDate.getMonth() + 6); // Cảnh báo trước 6 tháng

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
// Hàm mới để lấy tất cả thuốc
const listhuoc = async (req, res) => {
  try {
    const listhuoc = await Thuoc.findAll({
      where: {
        SoLuong: {
          [Sequelize.Op.gt]: 0,
        },
      },
      order: [
        ["TenThuoc", "ASC"],
        ["HanSuDung", "ASC"],
      ],
    });
    res.render("quanlythuoc", { listhuoc });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  createLoThuoc,
  getLoThuocDetails,
  getCanhBaoHanSuDung,
  getListLoThuoc,
  listhuoc,
};

const { LoThuoc } = require("../models/LoThuoc");
const { Thuoc } = require("../models/Thuoc");
const { Op } = require("sequelize");
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

// Chỉnh sửa số lượng thuốc trong lô
const updateThuocInLo = async (req, res) => {
  const { ThuocID } = req.params;
  const { SoLuong } = req.body;

  if (!SoLuong || SoLuong <= 0) {
    return res.json({
      success: false,
      message: "Số lượng phải lớn hơn 0",
    });
  }

  try {
    const thuoc = await Thuoc.findByPk(ThuocID);

    if (!thuoc) {
      return res.json({
        success: false,
        message: "Không tìm thấy thuốc",
      });
    }

    await thuoc.update({ SoLuong });

    res.json({
      success: true,
      data: thuoc,
      message: "Cập nhật số lượng thuốc thành công",
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      message: "Cập nhật số lượng thuốc thất bại",
    });
  }
};

// Xóa thuốc khỏi lô
const deleteThuocFromLo = async (req, res) => {
  const { ThuocID } = req.params;

  try {
    const thuoc = await Thuoc.findByPk(ThuocID);

    if (!thuoc) {
      return res.json({
        success: false,
        message: "Không tìm thấy thuốc",
      });
    }

    await thuoc.destroy();

    res.json({
      success: true,
      message: "Xóa thuốc thành công",
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      message: "Xóa thuốc thất bại",
    });
  }
};

// Xác nhận lưu lô thuốc
const finalizeLoThuoc = async (req, res) => {
  const { LoThuocID } = req.params;

  try {
    const loThuoc = await LoThuoc.findByPk(LoThuocID, {
      include: [{ model: Thuoc, as: "ThuocList" }],
    });

    if (!loThuoc) {
      return res.json({
        success: false,
        message: "Không tìm thấy lô thuốc",
      });
    }

    const totalCost = loThuoc.ThuocList.reduce(
      (total, thuoc) => total + thuoc.GiaTienNhap * thuoc.SoLuong,
      0
    );

    await loThuoc.update({
      TongTien: totalCost,
    });

    res.json({
      success: true,
      data: loThuoc,
      message: "Xác nhận lô thuốc thành công",
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      message: "Xác nhận lô thuốc thất bại",
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

// Hàm mới để lấy danh sách tất cả lô thuốc
const getListLoThuoc = async (req, res) => {
  try {
    const loThuoc = await LoThuoc.findAll();
    res.json(loThuoc);
  } catch (error) {
    res.status(500).send("Có lỗi xảy ra khi lấy danh sách lô thuốc.");
  }
};

// Hàm mới để lấy tất cả thuốc
const getAllThuoc = async (req, res) => {
  try {
    const thuoc = await Thuoc.findAll();
    res.json(thuoc);
  } catch (error) {
    res.status(500).send("Có lỗi xảy ra khi lấy danh sách thuốc.");
  }
};

module.exports = {
  createLoThuoc,
  getLoThuocDetails,
  updateThuocInLo,
  deleteThuocFromLo,
  finalizeLoThuoc,
  getCanhBaoHanSuDung,
  getListLoThuoc,
  getAllThuoc,
};

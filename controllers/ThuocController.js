const { LoThuoc } = require("../models/LoThuoc");
const { Thuoc } = require("../models/Thuoc");
const sequelize = require("../config/sequelize");

// 1. Tạo lô thuốc mới
const createLoThuoc = async (req, res) => {
  const { NgayNhap, ThuocList } = req.body;

  if (!NgayNhap || isNaN(new Date(NgayNhap).getTime())) {
    return res.json({
      success: false,
      message: "Ngày nhập không hợp lệ",
    });
  }

  if (!Array.isArray(ThuocList) || ThuocList.length === 0) {
    return res.json({
      success: false,
      message: "Danh sách thuốc không được để trống",
    });
  }

  const transaction = await sequelize.transaction();
  try {
    const newLoThuoc = await LoThuoc.create(
      { NgayNhap, TongTien: 0 },
      { transaction }
    );

    let totalCost = 0;
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

// 2. Hiển thị chi tiết lô thuốc
const getLoThuocDetails = async (req, res) => {
  const { LoThuocID } = req.params;

  if (!LoThuocID) {
    return res.json({
      success: false,
      message: "ID lô thuốc không được để trống",
    });
  }

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

// 3. Chỉnh sửa số lượng thuốc trong lô
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

// 4. Xóa thuốc khỏi lô
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

// 5. Xác nhận lưu lô thuốc
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

    await loThuoc.update({ TongTien: totalCost });

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

// 6. Lấy tất cả thuốc
const getAllThuoc = async (req, res) => {
  try {
    const allThuoc = await Thuoc.findAll({
      include: [
        {
          model: LoThuoc,
          as: "LoThuoc",
          attributes: ["LoThuocID", "NgayNhap", "TongTien"],
        },
      ],
    });

    if (allThuoc.length === 0) {
      return res.json({
        success: true,
        data: [],
        message: "Không có thuốc nào trong danh sách",
      });
    }

    res.json({
      success: true,
      data: allThuoc,
      message: "Lấy danh sách thuốc thành công",
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      message: "Lấy danh sách thuốc thất bại",
    });
  }
};

// 7. Lấy danh sách lô thuốc
const getListLoThuoc = async (req, res) => {
  try {
    const loThuocList = await LoThuoc.findAll({
      include: [
        {
          model: Thuoc,
          as: "ThuocList",
          attributes: [
            "ThuocID",
            "TenThuoc",
            "SoLuong",
            "HanSuDung",
            "GiaTienNhap",
          ],
        },
      ],
    });

    res.json({
      success: true,
      data: loThuocList,
      message: "Lấy danh sách lô thuốc thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách lô thuốc",
      error: error.message,
    });
  }
};

module.exports = {
  createLoThuoc,
  getLoThuocDetails,
  updateThuocInLo,
  deleteThuocFromLo,
  finalizeLoThuoc,
  getAllThuoc,
  getListLoThuoc,
};

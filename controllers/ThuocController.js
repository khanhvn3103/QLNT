const { LoThuoc } = require("../models/LoThuoc");
const { Thuoc } = require("../models/Thuoc");
const { Op } = require("sequelize");
const sequelize = require("../config/sequelize");

// 1. Tạo lô thuốc mới
const createLoThuoc = async (req, res) => {
  const { NgayNhap, ThuocList } = req.body; // Nhận danh sách thuốc từ request
  if (!NgayNhap || !Array.isArray(ThuocList) || ThuocList.length === 0) {
    return res.json({
      success: false,
      message: "Ngày nhập và danh sách thuốc không được để trống",
    });
  }

  const transaction = await sequelize.transaction(); // Tạo transaction để đảm bảo toàn vẹn dữ liệu
  try {
    // Tạo lô thuốc mới
    const newLoThuoc = await LoThuoc.create(
      {
        NgayNhap,
        TongTien: 0, // Tổng tiền sẽ cập nhật sau
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

    await transaction.commit(); // Lưu toàn bộ thay đổi
    res.json({
      success: true,
      data: newLoThuoc,
      message: "Tạo lô thuốc thành công",
    });
  } catch (error) {
    await transaction.rollback(); // Hoàn tác nếu xảy ra lỗi
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

  try {
    const loThuoc = await LoThuoc.findByPk(LoThuocID, {
      include: [
        {
          model: Thuoc,
          as: "ThuocList", // Tên alias nếu có định nghĩa quan hệ trong models
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

module.exports = {
  createLoThuoc,
  getLoThuocDetails,
  updateThuocInLo,
  deleteThuocFromLo,
  finalizeLoThuoc,
};

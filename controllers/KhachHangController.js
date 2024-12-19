const { KhachHang } = require("../models/KhachHang");
const { Op } = require("sequelize");
const sequelize = require("../config/sequelize/index");

const listKhachHang = async (req, res) => {
  try {
    const listKhachHang = await KhachHang.findAll();
    res.render("quanlykhachhang", { listKhachHang });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const getAllKhachHang = async () => {
  try {
    const listKhachHang = await KhachHang.findAll({
      attributes: ["SoDienThoai", "HoTen", "Diem"],
    });

    return listKhachHang; // Trả về dữ liệu mà không gọi res.json
  } catch (err) {
    console.error("Lỗi khi lấy danh sách khách hàng:", err);
    throw err;
  }
};

const getKhachHangByPhone = async (req, res) => {
  try {
    const phone = req.params.phone;
    const khachHang = await KhachHang.findOne({
      where: { SoDienThoai: phone },
    });

    if (khachHang) {
      return res.json({ success: true, khachHang });
    } else {
      return res.json({ success: false, message: "Khách hàng không tồn tại." });
    }
  } catch (error) {
    console.error("Lỗi khi tìm kiếm khách hàng:", error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi." });
  }
};

module.exports = {
  listKhachHang,
  getAllKhachHang,
  getKhachHangByPhone,
};

const express = require("express");
const router = express.Router();
const {
  getAllKhachHang,
  getKhachHangByPhone,
} = require("../controllers/KhachHangController");
const { getVoucher } = require("../controllers/MaGiamGiaController");
const { getAllThuoc } = require("../controllers/ThuocController");
const { saveOrder } = require("../controllers/HoaDonController");

// Lấy danh sách thuốc và khách hàng
router.get("/", async (req, res) => {
  try {
    const thuoc = await getAllThuoc();
    const khachHang = await getAllKhachHang();
    res.render("banhang", {
      thuoc,
      khachHang,
    });
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu:", err);
    res.status(500).json({
      message: "Đã xảy ra lỗi khi lấy dữ liệu.",
      error: err.message,
    });
  }
});

// Tìm kiếm khách hàng theo số điện thoại
router.get("/khachhang/:phone", getKhachHangByPhone);
router.get("/voucher/:voucher", getVoucher);

// Lưu đơn hàng
router.post("/", saveOrder);

module.exports = router;

// routes/KhachHangRoutes.js
const express = require("express");
const router = express.Router();
const KhachHangController = require("../controllers/KhachHangController");

// Route để lấy và hiển thị danh sách khách hàng
router.get("/", KhachHangController.listKhachHang);

module.exports = router;

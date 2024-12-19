// routes/hoaDon.js
const express = require("express");
const router = express.Router();
const HoaDonController = require("../controllers/HoaDonController");

// Route để lấy danh sách hóa đơn
router.get("/", HoaDonController.listHoaDon);

// Route để lấy chi tiết hóa đơn
router.get("/chitiet/:id", HoaDonController.getChiTietHoaDon);

module.exports = router;

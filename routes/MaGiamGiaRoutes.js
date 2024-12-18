const express = require("express");
const router = express.Router();
const MaGiamGiaController = require("../controllers/MaGiamGiaController");

// Hiển thị trang quản lý người dùng
router.get("/", MaGiamGiaController.listVoucher);

// Thêm người dùng
router.post("/", MaGiamGiaController.addVoucher);

// Xóa người dùng
router.delete("/:MaGiamGiaID", MaGiamGiaController.deleteVoucher);

module.exports = router;

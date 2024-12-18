const express = require("express");
const router = express.Router();
const ThuocController = require("../controllers/ThuocController");

// Routes cho thuốc
router.get("/", ThuocController.listhuoc); // Lấy tất cả thuốc

// Route để lấy danh sách các lô thuốc
router.get("/lothuoc", ThuocController.getListLoThuoc);

// Route để thêm một lô thuốc mới
router.post("/lothuoc", ThuocController.createLoThuoc);

// Route để lấy chi tiết thông tin lô thuốc theo ID
router.get("/lothuoc/:LoThuocID", ThuocController.getLoThuocDetails);

module.exports = router;

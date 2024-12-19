const express = require("express");
const router = express.Router();
const ThuocController = require("../controllers/ThuocController");

// Routes cho thuốc
router.get("/", ThuocController.listthuoc);

// Route để lấy danh sách các lô thuốc
router.get("/lothuoc", ThuocController.getListLoThuoc);

// Route để thêm một lô thuốc mới
router.post("/lothuoc", ThuocController.createLoThuoc);

module.exports = router;

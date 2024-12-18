const express = require("express");
const router = express.Router();
const ThuocController = require("../controllers/ThuocController");

// Routes cho lô thuốc
router.get("/lothuoc", ThuocController.getListLoThuoc); // Lấy danh sách lô thuốc
router.post("/lothuoc", ThuocController.createLoThuoc); // Tạo lô thuốc mới
router.get("/lothuoc/:LoThuocID", ThuocController.getLoThuocDetails); // Lấy chi tiết lô thuốc
router.put("/lothuoc/:LoThuocID", ThuocController.finalizeLoThuoc); // Xác nhận lô thuốc

// Routes cho thuốc
router.get("/", ThuocController.getAllThuoc); // Lấy tất cả thuốc
router.put("/:ThuocID", ThuocController.updateThuocInLo); // Chỉnh sửa số lượng thuốc trong lô
router.delete("/:ThuocID", ThuocController.deleteThuocFromLo); // Xóa thuốc khỏi lô

module.exports = router;

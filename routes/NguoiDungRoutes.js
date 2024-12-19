const express = require("express");
const router = express.Router();
const NguoiDungController = require("../controllers/NguoiDungController");

// Trang đăng nhập

// Hiển thị trang quản lý người dùng
router.get("/", NguoiDungController.showUserManagementPage);

// Thêm người dùng
router.post("/", NguoiDungController.addUser);

// Sửa người dùng
router.put("/:TenTaiKhoan", NguoiDungController.updateUser);

// Xóa người dùng
router.delete("/:TenTaiKhoan", NguoiDungController.deleteUser);

// Lấy thông tin một người dùng cụ thể
router.get("/:TenTaiKhoan", NguoiDungController.getUserInfo);

module.exports = router;

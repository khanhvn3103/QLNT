const express = require("express");
const router = express.Router();
const { NguoiDung } = require("../models/NguoiDung");
const NguoiDungController = require("../controllers/NguoiDungController");

//Trang Đang Nhập
router.get("/login", NguoiDungController.showLoginForm);
router.post("/login", NguoiDungController.handleLogin);
router.get("/logout", NguoiDungController.logout);

//lấy danh sách nhân viên
router.get("/users", NguoiDungController.listUsers);

// Hiển thị form thêm nhân viên
router.get("/users/add", (req, res) => {
  res.render("add-user", { response: null }); // Không có phản hồi ban đầu
});

// Xử lý thêm nhân viên
router.post("/users/add", async (req, res) => {
  const { TenTaiKhoan, MatKhau, Email, SoDienThoai, ChucVu, HoTen, DiaChi } =
    req.body;

  // Gọi hàm addUser từ controller để thêm người dùng
  const response = await NguoiDungController.addUser({
    TenTaiKhoan,
    MatKhau,
    Email,
    SoDienThoai,
    ChucVu,
    HoTen,
    DiaChi,
  });

  // Render trang với kết quả từ hàm addUser
  res.render("add-user", {
    response,
  });
});

module.exports = router;

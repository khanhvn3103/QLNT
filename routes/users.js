const express = require("express");
const router = express.Router();
const { NguoiDung } = require("../models/NguoiDung");

// Hiển thị form thêm nhân viên
router.get("/add", (req, res) => {
  res.render("add-user", { response: null }); // Không có phản hồi ban đầu
});

// Xử lý thêm nhân viên
router.post("/add", async (req, res) => {
  const { TenTaiKhoan, MatKhau, Email, SoDienThoai, ChucVu, HoTen, DiaChi } =
    req.body;

  try {
    // Thêm người dùng vào database
    const newUser = await NguoiDung.create({
      TenTaiKhoan,
      MatKhau,
      Email,
      SoDienThoai,
      ChucVu,
      HoTen,
      DiaChi,
    });

    res.render("add-user", {
      response: {
        success: true,
        data: newUser,
        message: "Thêm nhân viên thành công!",
      },
    });
  } catch (error) {
    res.render("add-user", {
      response: {
        success: false,
        error: error.message,
        message: "Thêm nhân viên thất bại!",
      },
    });
  }
});

module.exports = router;

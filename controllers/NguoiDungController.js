const { NguoiDung } = require("../models/NguoiDung");
const { Op } = require("sequelize");
const sequelize = require("../config/sequelize/index");
const bcrypt = require("bcrypt");
// List user API
const listUsers = (req, res) => {
  NguoiDung.findAll({
    attributes: ["TenTaiKhoan"],
    order: [["TenTaiKhoan"]],
  })
    .then((listUsers) => {
      return res.json({
        success: true,
        data: listUsers,
        message: "List All User Success",
      });
    })
    .catch((err) => {
      return res.json({
        success: false,
        error: err.message,
        message: "List All User Fail",
      });
    });
};

// Get thông tin của 1 userID
const getUserInfo = (req, res) => {
  const userID = req.params.TenTaiKhoan;
  NguoiDung.findByPk(userID, {
    attributes: { exclude: ["MatKhau"] },
  })
    .then((user) => {
      if (!user) {
        return res.json({
          success: false,
          data: null,
          message: "User not found",
        });
      }
      return res.json({
        success: true,
        data: user,
        message: "Get User Success",
      });
    })
    .catch((err) => {
      return res.json({
        success: false,
        error: err.message,
        message: "Get User Fail",
      });
    });
};

// List roles của 1 userID
const getUserRoles = (req, res) => {
  const userID = req.params.TenTaiKhoan;

  if (!userID) {
    return res.json({
      success: false,
      data: null,
      message: "UserID is required",
    });
  }

  sequelize
    .query(
      `SELECT TenTaiKhoan, ChucVu
    FROM nguoidung
    WHERE TenTaiKhoan = ? AND ChucVu = 1`,
      {
        replacements: [userID],
        model: NguoiDung,
        mapToModel: true,
      }
    )
    .then((roleUser) => {
      if (!roleUser || roleUser.length === 0) {
        return res.json({
          success: false,
          data: null,
          message: "User Role not found",
        });
      }
      return res.json({
        success: true,
        data: roleUser,
        message: "Get Role User Success",
      });
    })
    .catch((err) => {
      return res.json({
        success: false,
        error: err.message,
        message: "Get Role User Fail",
      });
    });
};

// Hiển thị form đăng nhập
const showLoginForm = (req, res) => {
  res.render("login", { error: null });
};

// Xử lý đăng nhập
const handleLogin = (req, res) => {
  const { TenTaiKhoan, MatKhau } = req.body;
  NguoiDung.findOne({
    where: {
      TenTaiKhoan,
      MatKhau,
    },
  })
    .then((user) => {
      if (!user) {
        return res.render("login", {
          error: "Tên tài khoản hoặc mật khẩu không đúng",
        });
      }
      req.session.user = user;
      res.redirect("/");
    })
    .catch((err) => {
      return res.render("login", { error: err.message });
    });
};

// Xử lý đăng xuất
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ success: false, message: "Đăng xuất thất bại" });
    }
    res.redirect("/login");
  });
};

// Hiển thị trang quản lý người dùng
const showUserManagementPage = (req, res) => {
  NguoiDung.findAll()
    .then((users) => {
      res.render("quanlynguoidung", { users });
    })
    .catch((err) => {
      res.render("quanlynguoidung", { error: err.message });
    });
};

// Thêm người dùng
const addUser = async (req, res) => {
  const { TenTaiKhoan, MatKhau, Email, SoDienThoai, ChucVu, HoTen, DiaChi } =
    req.body;

  try {
    const newUser = await NguoiDung.create({
      TenTaiKhoan,
      MatKhau,
      Email,
      SoDienThoai,
      ChucVu,
      HoTen,
      DiaChi,
    });
    res.status(201).json({
      success: true,
      data: newUser,
      message: "Thêm người dùng thành công",
    });
  } catch (error) {
    console.error("Error during user creation:", error.message);
    res.status(500).json({
      success: false,
      message: "Thêm người dùng thất bại",
      error: error.message,
    });
  }
};

// Cập nhật người dùng
const updateUser = async (req, res) => {
  const { TenTaiKhoan } = req.params;
  const { MatKhau, Email, SoDienThoai, ChucVu, HoTen, DiaChi } = req.body;

  try {
    const user = await NguoiDung.findOne({ where: { TenTaiKhoan } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Người dùng không tồn tại",
      });
    }

    if (MatKhau) {
      user.MatKhau = MatKhau;
    }
    user.Email = Email;
    user.SoDienThoai = SoDienThoai;
    user.ChucVu = ChucVu;
    user.HoTen = HoTen;
    user.DiaChi = DiaChi;

    await user.save();

    res.status(200).json({
      success: true,
      data: user,
      message: "Cập nhật người dùng thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cập nhật người dùng thất bại",
      error: error.message,
    });
  }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
  const { TenTaiKhoan } = req.params;
  try {
    // Ngắt liên kết các hóa đơn với tài khoản người dùng trước khi xóa người dùng
    await HoaDon.update({ TenTaiKhoan: null }, { where: { TenTaiKhoan } });

    // Xóa người dùng
    const result = await NguoiDung.destroy({ where: { TenTaiKhoan } });

    if (result) {
      res
        .status(200)
        .json({ success: true, message: "Xóa người dùng thành công" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Người dùng không tồn tại" });
    }
  } catch (error) {
    console.error("Error during user deletion:", error.message);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi xóa người dùng",
      error: error.message,
    });
  }
};

module.exports = {
  listUsers,
  getUserInfo,
  getUserRoles,
  showLoginForm,
  handleLogin,
  logout,
  showUserManagementPage,
  addUser,
  updateUser,
  deleteUser,
};

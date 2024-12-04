const { NguoiDung } = require("../models/NguoiDung");
const { Op } = require("sequelize");
const sequelize = require("../config/sequelize/index");

// list user
const listUsers = async (req, res) => {
  try {
    // Lấy danh sách người dùng từ cơ sở dữ liệu, loại trừ mật khẩu
    const listUsers = await NguoiDung.findAll({
      attributes: {
        exclude: ["MatKhau"], // Không lấy trường MatKhau
      },
      order: [["HoTen"]], // Sắp xếp theo tên người dùng
    });

    // Render trang với dữ liệu danh sách người dùng
    res.render("users", {
      users: listUsers,
      message: "Danh sách người dùng",
      error: null,
    });
  } catch (err) {
    // Nếu có lỗi, render trang với thông báo lỗi
    res.render("users", {
      users: [],
      message: "Không thể lấy danh sách người dùng",
      error: err.message,
    });
  }
};

const showLoginForm = (req, res) => {
  console.log("Rendering login form");
  res.render("login", { error: null });
};

const handleLogin = async (req, res) => {
  const { TenTaiKhoan, MatKhau } = req.body;

  try {
    // Tìm người dùng trong cơ sở dữ liệu theo tên tài khoản
    const user = await NguoiDung.findOne({
      where: { TenTaiKhoan },
    });

    // Kiểm tra nếu tài khoản không tồn tại
    if (!user) {
      console.log("Tài khoản không tồn tại");
      return res.render("login", { error: "Tài khoản không tồn tại." });
    }

    // So sánh mật khẩu người dùng nhập vào với mật khẩu lưu trong cơ sở dữ liệu
    console.log(`Mật khẩu người dùng nhập vào: ${MatKhau}`);
    console.log(`Mật khẩu trong cơ sở dữ liệu: ${user.MatKhau}`);

    // Nếu mật khẩu không khớp
    if (MatKhau !== user.MatKhau) {
      console.log("Sai mật khẩu");
      return res.render("login", { error: "Sai mật khẩu." });
    }

    // Lưu thông tin người dùng vào session sau khi đăng nhập thành công
    req.session.user = {
      TenTaiKhoan: user.TenTaiKhoan,
      HoTen: user.HoTen,
      ChucVu: user.ChucVu,
    };

    // Chuyển hướng đến trang người dùng
    res.redirect("/users");
  } catch (error) {
    console.error(error);
    res.render("login", { error: "Đã xảy ra lỗi. Vui lòng thử lại." });
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

//tạo tài khoản
const addUser = async (data) => {
  const { TenTaiKhoan, MatKhau, Email, SoDienThoai, ChucVu, HoTen, DiaChi } =
    data;

  try {
    // Kiểm tra nếu tên tài khoản đã tồn tại
    const existingUserByUsername = await NguoiDung.findOne({
      where: { TenTaiKhoan },
    });
    if (existingUserByUsername) {
      throw new Error("Tên tài khoản đã tồn tại.");
    }

    // Kiểm tra nếu email đã tồn tại
    const existingUserByEmail = await NguoiDung.findOne({
      where: { Email },
    });
    if (existingUserByEmail) {
      throw new Error("Email đã được sử dụng.");
    }

    // Kiểm tra nếu số điện thoại có định dạng hợp lệ
    const phoneRegex = /^[0-9]{10,15}$/; // Định dạng số điện thoại (10-15 chữ số)
    if (!phoneRegex.test(SoDienThoai)) {
      throw new Error("Số điện thoại không hợp lệ.");
    }

    // Kiểm tra nếu chức vụ là số và có giá trị hợp lệ
    if (isNaN(ChucVu) || ChucVu < 0) {
      throw new Error("Chức vụ không hợp lệ.");
    }

    // Thêm người dùng vào cơ sở dữ liệu
    const newUser = await NguoiDung.create({
      TenTaiKhoan,
      MatKhau,
      Email,
      SoDienThoai,
      ChucVu,
      HoTen,
      DiaChi,
    });

    return {
      success: true,
      data: newUser,
      message: "Thêm nhân viên thành công!",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message, // Trả về thông báo lỗi cụ thể
      message: "Thêm nhân viên thất bại!",
    };
  }
};

module.exports = {
  listUsers,
  showLoginForm,
  handleLogin,
  logout,
  addUser,
};

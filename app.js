const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");

// Khởi tạo ứng dụng
const app = express();

// Import routes
const NguoiDungRoutes = require("./routes/NguoiDungRoutes");
const thuocLoThuocRoutes = require("./routes/ThuocLoThuocRoutes");
const canhBaoRoutes = require("./routes/CanhBaoRoutes");
const maGiamGiaRoutes = require("./routes/MaGiamGiaRoutes");
const hoaDonRoutes = require("./routes/HoaDonRoutes");
const khachHangRoutes = require("./routes/KhachHangRoutes");
const banHangRoutes = require("./routes/BanHangRoutes");
const NguoiDungController = require("./controllers/NguoiDungController");

// Middleware cho bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cấu hình session
app.use(
  session({
    secret: "your-secret-key", // Dùng một khóa bí mật mạnh mẽ
    resave: false, // Không lưu lại session nếu không thay đổi
    saveUninitialized: true, // Lưu session ngay cả khi chưa thay đổi
    cookie: { secure: false }, // Chỉ dùng false khi đang phát triển (localhost)
  })
);

// Cấu hình EJS làm view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Cấu hình static files (nếu có tệp tĩnh như CSS, JS, images...)
app.use(express.static(path.join(__dirname, "public")));

// Middleware kiểm tra đăng nhập
const checkLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login"); // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  }
  next(); // Nếu đã đăng nhập, tiếp tục xử lý
};

// Trang chủ kiểm tra đăng nhập
app.get("/", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.redirect("/canhbao");
});

// Routes cho đăng nhập, đăng xuất
app.get("/login", NguoiDungController.showLoginForm);
app.post("/login", NguoiDungController.handleLogin);
app.get("/logout", NguoiDungController.logout);

// Áp dụng middleware checkLogin cho các route yêu cầu đăng nhập
app.use("/canhbao", checkLogin, canhBaoRoutes);
app.use("/thuoclo", checkLogin, thuocLoThuocRoutes);
app.use("/hoadon", checkLogin, hoaDonRoutes);
app.use("/khachhang", checkLogin, khachHangRoutes);
app.use("/banhang", checkLogin, banHangRoutes);

// Các route không yêu cầu đăng nhập (ví dụ: đăng ký, đăng nhập...)
app.use("/nguoidung", NguoiDungRoutes);
app.use("/magiamgia", maGiamGiaRoutes);

// Middleware xử lý lỗi 404 (tùy chọn)
app.use((req, res, next) => {
  res.status(404).send("Không tìm thấy trang!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

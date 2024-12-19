const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");

// Khởi tạo ứng dụng
const app = express();

// Import routes
const NguoiDungRoutes = require("./routes/NguoiDungRoutes");
const thuocLoThuocRoutes = require("./routes/ThuocLoThuocRoutes"); // Router hợp nhất cho lô thuốc và thuốc
const canhBaoRoutes = require("./routes/CanhBaoRoutes");
const maGiamGiaRoutes = require("./routes/MaGiamGiaRoutes");
const hoaDonRoutes = require("./routes/HoaDonRoutes");
const khachHangRoutes = require("./routes/KhachHangRoutes");
const banHangRoutes = require("./routes/BanHangRoutes");

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

// Vào trang chủ check đăng nhập
app.get("/", (req, res) => {
  if (!req.session.user) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    return res.redirect("/nguoidung/login"); // Chỉ cần tên tệp, không cần thêm dấu gạch chéo "/"
  }
  // Nếu đã đăng nhập, hiển thị trang cảnh báo
  res.redirect("/canhbao");
});

// Routes
app.use("/nguoidung", NguoiDungRoutes);
app.use("/thuoclo", thuocLoThuocRoutes); // Sử dụng router hợp nhất cho lô thuốc và thuốc
app.use("/canhbao", canhBaoRoutes);
app.use("/magiamgia", maGiamGiaRoutes);
app.use("/hoadon", hoaDonRoutes);
app.use("/khachhang", khachHangRoutes);
app.use("/banhang", banHangRoutes);

// Middleware xử lý lỗi 404 (tùy chọn)
app.use((req, res, next) => {
  res.status(404).send("Không tìm thấy trang!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

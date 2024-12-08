const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const loThuocRoutes = require("./routes/LoThuocRoutes");
const thuocRoutes = require("./routes/ThuocRoutes");
// const hoaDonRoutes = require("./routes/HoaDonRoutes");
// const khachHangRoutes = require("./routes/KhachHangRoutes");
// const voucherRoutes = require("./routes/VoucherRoutes");
// const canhBaoRoutes = require("./routes/CanhBaoRoutes");

// Middleware
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

// Cấu hình EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Cấu hình Static Files
app.use(express.static(path.join(__dirname, "public")));

// Vào trang chủ check đăng nhập
app.get("/", (req, res) => {
  if (!req.session.user) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    return res.redirect("/login");
  }
  // Nếu đã đăng nhập, hiển thị trang users
  res.redirect("/users");
});

// Routes
app.use("/users", userRoutes);
app.use("/lothuoc", LoThuocRoutes);
app.use("/thuoc", ThuocRoutes);

// Middleware xử lý lỗi 404
app.use((req, res, next) => {
  res.status(404).send("Không tìm thấy trang!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

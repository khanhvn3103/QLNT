const express = require("express");
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

// Cấu hình EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Cấu hình Static Files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/users", userRoutes);
app.use("/lothuoc", loThuocRoutes);
app.use("/thuoc", thuocRoutes);
// app.use("/hoadon", hoaDonRoutes);
// app.use("/khachhang", khachHangRoutes);
// app.use("/voucher", voucherRoutes);
// app.use("/canhbao", canhBaoRoutes);

// Middleware xử lý lỗi 404
app.use((req, res, next) => {
  res.status(404).send("Không tìm thấy trang!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const LoThuocRoutes = require("./routes/LoThuocRoutes");
const ThuocRoutes = require("./routes/ThuocRoutes");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cấu hình EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Cấu hình Static Files (nếu có tệp tĩnh như CSS, JS, images...)
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/users", userRoutes);
app.use("/lothuoc", LoThuocRoutes);
app.use("/thuoc", ThuocRoutes);

// Middleware xử lý lỗi 404 (tùy chọn)
app.use((req, res, next) => {
  res.status(404).send("Không tìm thấy trang!");
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

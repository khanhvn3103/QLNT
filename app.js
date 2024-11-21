const express = require("express");
const path = require("path");
const app = express();
const medicineRoutes = require("./routes/medicine"); // Nhập routes

// Cấu hình view engine là EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Cấu hình thư mục chứa tài nguyên tĩnh (CSS, JS, ảnh)
app.use(express.static(path.join(__dirname, "public")));

// Sử dụng các route đã khai báo
app.use("/", medicineRoutes);

// Khởi động server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000/");
});

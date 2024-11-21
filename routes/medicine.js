const express = require("express");
const router = express.Router();
const connection = require("../config/db"); // Nhập kết nối MySQL

// Route để render trang index.ejs với danh sách thuốc
router.get("/", (req, res) => {
  // Truy vấn danh sách thuốc từ cơ sở dữ liệu
  connection.query("SELECT * FROM thuoc", (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn:", err);
      res.status(500).send("Lỗi khi lấy dữ liệu thuốc");
      return;
    }
    // Truyền dữ liệu vào view
    res.render("index", { medicines: results });
  });
});

// Route để render trang thêm thuốc (addMedicine.ejs)
router.get("/medicine/add", (req, res) => {
  res.render("addMedicine");
});

// Route để thêm thuốc vào cơ sở dữ liệu
router.post("/medicine/add", (req, res) => {
  const { tenThuoc, soLuong, giaTien, hanSuDung } = req.body;
  connection.query(
    "INSERT INTO thuoc (tenThuoc, soLuong, giaTien, hanSuDung) VALUES (?, ?, ?, ?)",
    [tenThuoc, soLuong, giaTien, hanSuDung],
    (err, results) => {
      if (err) {
        console.error("Lỗi khi thêm thuốc:", err);
        res.status(500).send("Lỗi khi thêm thuốc");
        return;
      }
      res.redirect("/");
    }
  );
});

// Route để render trang chỉnh sửa thuốc (editMedicine.ejs)
router.get("/medicine/edit/:id", (req, res) => {
  const { id } = req.params;
  connection.query("SELECT * FROM thuoc WHERE id = ?", [id], (err, results) => {
    if (err || results.length === 0) {
      console.error("Lỗi truy vấn:", err);
      res.status(404).send("Thuốc không tồn tại");
      return;
    }
    res.render("editMedicine", { medicine: results[0] });
  });
});

// Route để cập nhật thuốc trong cơ sở dữ liệu
router.post("/medicine/edit/:id", (req, res) => {
  const { id } = req.params;
  const { tenThuoc, soLuong, giaTien, hanSuDung } = req.body;
  connection.query(
    "UPDATE thuoc SET tenThuoc = ?, soLuong = ?, giaTien = ?, hanSuDung = ? WHERE id = ?",
    [tenThuoc, soLuong, giaTien, hanSuDung, id],
    (err, results) => {
      if (err) {
        console.error("Lỗi khi cập nhật thuốc:", err);
        res.status(500).send("Lỗi khi cập nhật thuốc");
        return;
      }
      res.redirect("/");
    }
  );
});

// Route để xóa thuốc
router.get("/medicine/delete/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM thuoc WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Lỗi khi xóa thuốc:", err);
      res.status(500).send("Lỗi khi xóa thuốc");
      return;
    }
    res.redirect("/");
  });
});

module.exports = router;

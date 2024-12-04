const express = require("express");
const router = express.Router();
const ThuocController = require("../controllers/ThuocController");

// Route GET để hiển thị tất cả các thuốc
router.get("/", async (req, res) => {
  try {
    const thuocs = await Thuoc.findAll();
    res.render("listThuoc", { thuocs });
  } catch (error) {
    res.status(500).send("Lỗi khi lấy danh sách thuốc");
  }
});

// Route GET để tạo một thuốc mới
router.get("/create", (req, res) => {
  res.render("createThuoc"); // Giao diện cho người dùng tạo thuốc mới
});

// Route POST để thêm thuốc mới
// router.post("/create", ThuocController.createThuoc);

// Route GET để xem chi tiết của một thuốc theo ID
router.get("/:ThuocID", async (req, res) => {
  try {
    const thuoc = await Thuoc.findOne({
      where: { ThuocID: req.params.ThuocID },
    });
    if (!thuoc) {
      return res.status(404).send("Thuốc không tồn tại.");
    }
    res.render("thuocDetails", { thuoc });
  } catch (error) {
    res.status(500).send("Lỗi khi lấy thông tin thuốc");
  }
});

// Route POST để cập nhật thông tin thuốc
// router.post("/update/:ThuocID", ThuocController.updateThuoc);

// Route DELETE để xóa một thuốc
// router.delete("/delete/:ThuocID", ThuocController.deleteThuoc);

module.exports = router;

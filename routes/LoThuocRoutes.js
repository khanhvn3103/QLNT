const express = require("express");
const router = express.Router();
const LoThuocController = require("../controllers/ThuocController");
const { LoThuoc } = require("../models/LoThuoc"); // Đường dẫn đúng đến file model LoThuoc
const { Thuoc } = require("../models/Thuoc"); // Đường dẫn đúng đến file model Thuoc

// Route GET để hiển thị danh sách lô thuốc
// Route GET để hiển thị danh sách lô thuốc
router.get("/", async (req, res) => {
  try {
    // Lấy danh sách các Lô Thuốc
    const lothuocs = await LoThuoc.findAll();

    // Kiểm tra xem có Lô Thuốc được chọn không
    let loThuocDetails = null;
    if (req.query.loThuocId) {
      // Nếu có, lấy chi tiết thuốc trong lô
      loThuocDetails = await LoThuoc.findOne({
        where: { LoThuocID: req.query.loThuocId },
        include: {
          model: Thuoc, // Thêm bảng Thuoc để lấy chi tiết
          as: "Thuocs", // Alias của mối quan hệ trong Sequelize
        },
      });
    }

    // Render trang EJS với dữ liệu đã lấy
    res.render("listLoThuoc", {
      lothuocs: lothuocs, // Dữ liệu danh sách Lô Thuốc
      loThuocDetails: loThuocDetails, // Dữ liệu chi tiết Lô Thuốc (nếu có)
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi khi tải dữ liệu");
  }
});

// Route GET để tạo một lô thuốc mới
router.get("/create", (req, res) => {
  res.render("createLoThuoc"); // Giao diện để tạo lô thuốc mới
});

// Route POST để tạo một lô thuốc mới
router.post("/create", LoThuocController.createLoThuoc); // Xử lý tạo lô thuốc

// Route GET để xem chi tiết một lô thuốc theo LoThuocID
router.get("/:LoThuocID", LoThuocController.getLoThuocDetails); // Xem chi tiết thuốc trong lô

// Route POST để cập nhật thông tin thuốc trong lô thuốc
router.post("/update/thuoc/:ThuocID", LoThuocController.updateThuocInLo); // Cập nhật thuốc trong lô

// Route DELETE để xóa một thuốc khỏi lô thuốc
router.delete("/delete/thuoc/:ThuocID", LoThuocController.deleteThuocFromLo); // Xóa thuốc khỏi lô

// Route POST để cập nhật tổng tiền trong lô thuốc
// router.post("/update/tongtien/:LoThuocID", LoThuocController.updateTongTien); // Cập nhật tổng tiền trong lô thuốc

module.exports = router;

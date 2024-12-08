const express = require("express");
const router = express.Router();
const ThuocController = require("../controllers/ThuocController");
const { LoThuoc } = require("../models/LoThuoc");
const { Thuoc } = require("../models/Thuoc");

// Route GET để hiển thị danh sách lô thuốc
router.get("/", async (req, res) => {
  try {
    const lothuocs = await LoThuoc.findAll();
    let loThuocDetails = null;
    if (req.query.loThuocId) {
      loThuocDetails = await LoThuoc.findOne({
        where: { LoThuocID: req.query.loThuocId },
        include: {
          model: Thuoc,
          as: "Thuocs",
        },
      });
    }
    res.render("listLoThuoc", {
      lothuocs: lothuocs,
      loThuocDetails: loThuocDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi khi tải dữ liệu");
  }
});

// Route GET để tạo một lô thuốc mới
router.get("/create", (req, res) => {
  res.render("createLoThuoc");
});

// Route POST để tạo một lô thuốc mới
router.post("/create", ThuocController.createLoThuoc);

// Route GET để xem chi tiết một lô thuốc theo LoThuocID
router.get("/:LoThuocID", ThuocController.getLoThuocDetails);

// Route POST để cập nhật thông tin thuốc trong lô thuốc
router.post("/update/thuoc/:ThuocID", ThuocController.updateThuocInLo);

// Route DELETE để xóa một thuốc khỏi lô thuốc
router.delete("/delete/thuoc/:ThuocID", ThuocController.deleteThuocFromLo);

module.exports = router;

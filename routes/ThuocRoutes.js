const express = require("express");
const router = express.Router();
const { Thuoc } = require("../models/Thuoc");
const { Op } = require("sequelize");

// Route GET để hiển thị tất cả các thuốc
router.get("/", async (req, res) => {
  try {
    const thuocs = await Thuoc.findAll({
      where: {
        SoLuong: {
          [Op.gt]: 0, // Chỉ hiển thị thuốc có số lượng > 0
        },
      },
    });
    res.render("listThuoc", { thuocs });
  } catch (error) {
    res.status(500).send("Lỗi khi lấy danh sách thuốc");
  }
});

module.exports = router;

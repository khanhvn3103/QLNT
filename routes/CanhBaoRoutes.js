const express = require("express");
const router = express.Router();
const { getCanhBaoHanSuDung } = require("../controllers/ThuocController");

// Định tuyến cho trang cảnh báo
router.get("/", getCanhBaoHanSuDung);

module.exports = router;

const express = require("express");
const router = express.Router();
const { getThuocGanHetHan } = require("../controllers/ThuocController");

router.get("/", getThuocGanHetHan);

module.exports = router;

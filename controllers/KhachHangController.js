const { KhachHang } = require("../models/KhachHang");
const { Op } = require("sequelize");
const sequelize = require("../config/sequelize/index");

const listKhachHang = async (req, res) => {
  try {
    const listKhachHang = await KhachHang.findAll();
    res.render("quanlykhachhang", { listKhachHang });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
module.exports = {
  listKhachHang,
};

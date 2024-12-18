const { MaGiamGia } = require("../models/MaGiamGia");
const { Op } = require("sequelize");
const sequelize = require("../config/sequelize/index");

const listVoucher = (req, res) => {
  MaGiamGia.findAll()
    .then((listvouchers) => {
      res.render("quanlymagiamgia", { listvouchers });
    })
    .catch((err) => {
      res.render("quanlymagiamgia", { error: err.message });
    });
};
const addVoucher = async (req, res) => {
  const { beginAt, endAt, GiamGia } = req.body;
  function randomtext(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }
  MaGiamGiaID = randomtext(10);
  try {
    const newUser = await MaGiamGia.create({
      MaGiamGiaID,
      beginAt,
      endAt,
      GiamGia,
    });
    res.status(201).json({
      success: true,
      data: newUser,
      message: "Thêm mã giảm giá thành công",
    });
  } catch (error) {
    console.error("Error during user creation:", error.message);
    res.status(500).json({
      success: false,
      message: "Thêm mã giảm giá thất bại",
      error: error.message,
    });
  }
};
const deleteVoucher = async (req, res) => {
  const { MaGiamGiaID } = req.params;
  try {
    const voucher = await MaGiamGia.destroy({
      where: { MaGiamGiaID },
    });

    if (voucher) {
      res
        .status(200)
        .json({ success: true, message: "Xóa mã giảm giá thành công" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Không tìm thấy mã giảm giá" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Đã xảy ra lỗi khi xóa mã giảm giá" });
  }
};

module.exports = {
  listVoucher,
  addVoucher,
  deleteVoucher,
};

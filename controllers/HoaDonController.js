const { HoaDon } = require("../models/HoaDon");
const { ChiTietHD } = require("../models/ChiTietHD");
const { Thuoc } = require("../models/Thuoc");
const { Op } = require("sequelize");
const sequelize = require("../config/sequelize/index");

const listHoaDon = async (req, res) => {
  try {
    const listHoaDon = await HoaDon.findAll({
      order: [["TenTaiKhoan"], ["NgayBan"]],
    });

    res.render("quanlyhoadon", { listHoaDon });
  } catch (err) {
    console.error("Lỗi khi lấy danh sách hóa đơn:", err);
    res.status(500).send(err.message);
  }
};

const getChiTietHoaDon = async (req, res) => {
  const hoaDonID = req.params.id;
  console.log(`Lấy chi tiết hóa đơn với ID: ${hoaDonID}`);

  try {
    // Truy vấn hóa đơn theo ID
    const hoaDon = await HoaDon.findOne({ where: { HoaDonID: hoaDonID } });
    if (!hoaDon) {
      return res.status(404).json({ error: "Không tìm thấy hóa đơn" });
    }

    // Truy vấn chi tiết hóa đơn với thông tin thuốc
    const chiTietHD = await ChiTietHD.findAll({
      where: { HoaDonID: hoaDonID },
      attributes: ["ThuocID", "SoLuong", "DonGia"],
    });

    // Lấy thông tin thuốc từ bảng Thuoc
    const thuocIds = chiTietHD.map((item) => item.ThuocID);
    const thuocList = await Thuoc.findAll({
      where: { ThuocID: thuocIds },
      attributes: ["ThuocID", "TenThuoc"],
    });

    // Ghép thông tin thuốc vào chi tiết hóa đơn
    const chiTietHDWithThuoc = chiTietHD.map((ct) => {
      const thuoc = thuocList.find((t) => t.ThuocID === ct.ThuocID);
      return {
        ...ct.dataValues,
        Thuoc: thuoc ? thuoc.dataValues : null,
      };
    });

    // Trả kết quả về client
    return res.json({ hoaDon, chiTietHD: chiTietHDWithThuoc });
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết hóa đơn:", error);
    return res.status(500).json({
      error: "Đã xảy ra lỗi khi lấy chi tiết hóa đơn",
      details: error.message,
    });
  }
};

module.exports = {
  listHoaDon,
  getChiTietHoaDon,
};

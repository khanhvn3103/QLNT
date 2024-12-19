const { HoaDon } = require("../models/HoaDon");
const { ChiTietHD } = require("../models/ChiTietHD");
const { Thuoc } = require("../models/Thuoc");
const { KhachHang } = require("../models/KhachHang");
const { Op, DATE } = require("sequelize");
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

const saveOrder = async (req, res) => {
  const { Diem, HoTen, MaGiamGiaID, SoDienThoai, TongTien, cart } = req.body;
  let today = new Date();
  const TenTaiKhoan = req.session.user.TenTaiKhoan;
  try {
    // Kiểm tra xem khách hàng đã tồn tại chưa
    let khachhang = await KhachHang.findByPk(SoDienThoai);

    // Nếu khách hàng tồn tại
    if (khachhang) {
      // Cập nhật điểm
      khachhang.Diem += TongTien / 1000;
      await khachhang.save();
    } else {
      // Nếu khách hàng không tồn tại, tạo mới
      khachhang = await KhachHang.create({
        SoDienThoai: SoDienThoai,
        HoTen: HoTen,
        Diem: parseInt(TongTien / 1000),
      });
    }

    // Tạo hóa đơn mới
    const newOrder = await HoaDon.create({
      TenTaiKhoan: TenTaiKhoan,
      NgayBan: today,
      MaGiamGiaID: MaGiamGiaID || null,
      SoDienThoai: SoDienThoai,
      TongTien: parseFloat(TongTien),
    });

    // Tạo chi tiết hóa đơn cho từng mặt hàng trong giỏ
    for (const item of cart) {
      try {
        // Kiểm tra nếu ChiTietHD với HoaDonID và ThuocID đã tồn tại
        const existingDetail = await ChiTietHD.findOne({
          where: {
            HoaDonID: parseInt(newOrder.HoaDonID),
            ThuocID: parseInt(item.id),
          },
        });

        if (existingDetail) {
          // Nếu đã tồn tại, cập nhật số lượng và đơn giá
          existingDetail.SoLuong += parseInt(item.quantity);
          existingDetail.DonGia = parseFloat(item.price);
          await existingDetail.save();
        } else {
          // Nếu chưa tồn tại, tạo mới
          const newChiTietHD = await ChiTietHD.create({
            HoaDonID: parseInt(newOrder.HoaDonID),
            ThuocID: parseInt(item.id),
            SoLuong: parseInt(item.quantity),
            DonGia: parseFloat(item.price),
          });
        }
        // Truy vấn thuốc với ThuocID và LoThuocID cụ thể
        const thuoc = await Thuoc.findOne({
          where: {
            ThuocID: parseInt(item.id),
            LoThuocID: parseInt(item.loid),
          },
        });

        if (thuoc) {
          thuoc.SoLuong -= parseInt(item.quantity);
          await thuoc.save();
        } else {
          console.error("Thuốc không tồn tại với ThuocID và LoThuocID này");
        }
      } catch (error) {
        console.error(
          "Error creating or updating ChiTietHD or updating Thuoc:",
          error.message
        );
        console.error("Validation errors:", error.errors);
      }
    }

    // Trả về kết quả thành công
    res.status(201).json({
      success: true,
      data: newOrder,
      message: "Thêm hóa đơn thành công",
    });
  } catch (error) {
    console.error("Error during bill creation:", error.message);
    res.status(500).json({
      success: false,
      message: "Thêm hóa đơn thất bại",
      error: error.message,
    });
  }
};

module.exports = {
  listHoaDon,
  getChiTietHoaDon,
  saveOrder,
};

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const { NguoiDung } = require("./NguoiDung");
const { KhachHang } = require("./khachhang");
const { MaGiamGia } = require("./MaGiamGia");

class HoaDon extends Model {}

HoaDon.init(
  {
    HoaDonID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    LoThuocID: {
      type: DataTypes.INTEGER,
      references: {
        model: NguoiDung, // Tham chiếu tới model Medicine
        key: "TenTaiKhoan", // Khóa chính của model Medicine
      },
      allowNull: false,
    },
    NgayBan: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    MaGiamGiaID: {
      type: DataTypes.TEXT,
      references: {
        model: MaGiamGia, // Tham chiếu tới model Medicine
        key: "MaGiamGiaID", // Khóa chính của model Medicine
      },
    },
    SoDienThoai: {
      type: DataTypes.TEXT,
      references: {
        model: KhachHang, // Tham chiếu tới model Medicine
        key: "SoDienThoai", // Khóa chính của model Medicine
      },
      allowNull: false,
    },
    TongTien: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "HoaDon", // Tên của model
    tableName: "hoadon", // Tên của bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng timestamps (createdAt và updatedAt)
  }
);
module.exports = { HoaDon };

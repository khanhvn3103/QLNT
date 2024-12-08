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
    TenTaiKhoan: {
      // Sửa lại từ LoThuocID thành TenTaiKhoan
      type: DataTypes.TEXT,
      references: {
        model: NguoiDung,
        key: "TenTaiKhoan",
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
        model: MaGiamGia,
        key: "MaGiamGiaID",
      },
    },
    SoDienThoai: {
      type: DataTypes.TEXT,
      references: {
        model: KhachHang,
        key: "SoDienThoai",
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
    modelName: "HoaDon",
    tableName: "hoadon",
    timestamps: false,
  }
);
module.exports = { HoaDon };

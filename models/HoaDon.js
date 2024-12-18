const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const { NguoiDung } = require("./NguoiDung"); // Import model NguoiDung

class HoaDon extends Model {}

HoaDon.init(
  {
    HoaDonID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    TenTaiKhoan: {
      type: DataTypes.TEXT,
      references: {
        model: NguoiDung,
        key: "TenTaiKhoan",
      },
      allowNull: false,
      onDelete: "CASCADE",
    },
    NgayBan: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    MaGiamGiaID: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    SoDienThoai: {
      type: DataTypes.TEXT,
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

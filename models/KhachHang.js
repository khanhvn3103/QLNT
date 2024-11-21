const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class KhachHang extends Model {}

KhachHang.init(
  {
    SoDienThoai: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
    HoTen: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Diem: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "KhachHang", // Tên của model
    tableName: "khachhang", // Tên của bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng timestamps (createdAt và updatedAt)
  }
);
module.exports = { KhachHang };

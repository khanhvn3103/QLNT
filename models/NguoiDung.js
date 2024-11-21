const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class NguoiDung extends Model {}

NguoiDung.init(
  {
    TenTaiKhoan: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
    MatKhau: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Email: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
    SoDienThoai: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ChucVu: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    HoTen: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    DiaChi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "NguoiDung", // Tên của model
    tableName: "nguoidung", // Tên của bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng timestamps (createdAt và updatedAt)
  }
);
module.exports = { NguoiDung };

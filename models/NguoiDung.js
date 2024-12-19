const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class NguoiDung extends Model {}

NguoiDung.init(
  {
    TenTaiKhoan: {
      type: DataTypes.TEXT,
      primaryKey: true,
      unique: true,
    },
    MatKhau: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Email: {
      type: DataTypes.TEXT,
      primaryKey: true,
      unique: true,
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
    modelName: "NguoiDung",
    tableName: "nguoidung",
    timestamps: false,
  }
);
module.exports = { NguoiDung };

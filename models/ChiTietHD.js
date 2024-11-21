const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const { Thuoc } = require("./Thuoc");
const { HoaDon } = require("./HoaDon");

class ChiTietHD extends Model {}

ChiTietHD.init(
  {
    ThuocID: {
      type: DataTypes.INTEGER,
      references: {
        model: Thuoc, // Tham chiếu tới model Medicine
        key: "ThuocID", // Khóa chính của model Medicine
      },
      allowNull: false,
      primaryKey: true,
    },
    HoaDonID: {
      type: DataTypes.INTEGER,
      references: {
        model: HoaDon, // Tham chiếu tới model Medicine
        key: "HoaDonID", // Khóa chính của model Medicine
      },
      allowNull: false,
      primaryKey: true,
    },
    SoLuong: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DonGia: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ChiTietHD", // Tên của model
    tableName: "chitiethd", // Tên của bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng timestamps (createdAt và updatedAt)
  }
);
module.exports = { ChiTietHD };

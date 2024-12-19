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
        model: Thuoc, // Tham chiếu tới model Thuoc
        key: "ThuocID", // Khóa chính của model Thuoc
      },
      allowNull: false,
      primaryKey: true, // ThuocID là một phần của khóa chính hợp nhất
    },
    HoaDonID: {
      type: DataTypes.INTEGER,
      references: {
        model: HoaDon, // Tham chiếu tới model HoaDon
        key: "HoaDonID", // Khóa chính của model HoaDon
      },
      allowNull: false,
      primaryKey: true, // HoaDonID là một phần của khóa chính hợp nhất
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
    modelName: "ChiTietHD",
    tableName: "chitiethd",
    timestamps: false,
  }
);

module.exports = { ChiTietHD };

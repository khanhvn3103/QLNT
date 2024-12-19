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
        model: Thuoc,
        key: "ThuocID",
      },
      allowNull: false,
      primaryKey: true,
    },
    HoaDonID: {
      type: DataTypes.INTEGER,
      references: {
        model: HoaDon,
        key: "HoaDonID",
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
    modelName: "ChiTietHD",
    tableName: "chitiethd",
    timestamps: false,
  }
);

module.exports = { ChiTietHD };

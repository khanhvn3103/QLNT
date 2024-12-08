const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const { LoThuoc } = require("./LoThuoc");

class Thuoc extends Model {}

Thuoc.init(
  {
    ThuocID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    LoThuocID: {
      type: DataTypes.INTEGER,
      references: {
        model: LoThuoc,
        key: "LoThuocID",
      },
      primaryKey: true,
      allowNull: false,
    },
    HanSuDung: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    SoLuong: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TenThuoc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    NgaySanXuat: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    GiaTienNhap: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    GiaTienBan: {
      // Sửa lại từ GiaTienNBan thành GiaTienBan
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Thuoc",
    tableName: "thuoc",
    timestamps: false,
  }
);
module.exports = { Thuoc };

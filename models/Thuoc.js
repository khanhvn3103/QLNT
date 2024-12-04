const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class Thuoc extends Model {
  static associate(models) {
    Thuoc.belongsTo(models.LoThuoc, {
      foreignKey: "LoThuocID",
      as: "LoThuoc", // Alias cho quan hệ
    });
  }
}

Thuoc.init(
  {
    ThuocID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    LoThuocID: {
      type: DataTypes.INTEGER,
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
    GiaTienNBan: {
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

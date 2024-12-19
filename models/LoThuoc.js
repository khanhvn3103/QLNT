const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class LoThuoc extends Model {}

LoThuoc.init(
  {
    LoThuocID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    NgayNhap: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    TongTien: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "LoThuoc",
    tableName: "lothuoc",
    timestamps: false,
  }
);

module.exports = { LoThuoc };

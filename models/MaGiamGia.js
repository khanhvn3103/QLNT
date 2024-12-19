const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class MaGiamGia extends Model {}

MaGiamGia.init(
  {
    MaGiamGiaID: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
    beginAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    GiamGia: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "MaGiamGia",
    tableName: "magiamgia",
    timestamps: false,
  }
);
module.exports = { MaGiamGia };

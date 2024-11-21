const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class MaGiamGia extends Model {}

MaGiamGia.init(
  {
    MaGiamGiaID: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
    GiamGia: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "MaGiamGia", // Tên của model
    tableName: "magiamgia", // Tên của bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng timestamps (createdAt và updatedAt)
  }
);
module.exports = { MaGiamGia };

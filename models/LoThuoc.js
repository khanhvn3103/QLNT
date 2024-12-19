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
    modelName: "LoThuoc", // Tên của model
    tableName: "lothuoc", // Tên của bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng timestamps (createdAt và updatedAt)
  }
);

module.exports = { LoThuoc };

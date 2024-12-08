const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const { Thuoc } = require("./Thuoc");

class LoThuoc extends Model {
  static associate() {
    LoThuoc.hasMany(Thuoc, {
      foreignKey: "LoThuocID",
      as: "ThuocList",
    });
  }
}

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

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
        model: LoThuoc, // Tham chiếu tới model Medicine
        key: "LoThuocID", // Khóa chính của model Medicine
      },
      primaryKey: true,
      allowNull: false, // Không cho phép giá trị NULL
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
    modelName: "Thuoc", // Tên của model
    tableName: "thuoc", // Tên của bảng trong cơ sở dữ liệu
    timestamps: false, // Không sử dụng timestamps (createdAt và updatedAt)
  }
);
module.exports = { Thuoc };

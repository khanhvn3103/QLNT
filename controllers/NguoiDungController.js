const { NguoiDung } = require("../models/NguoiDung");
const { Op } = require("sequelize");
const sequelize = require("../config/sequelize/index");

// list user api
const listUsers = (req, res) => {
  const getUsers = NguoiDung.findAll({
    attributes: ["TenTaiKhoan"],
    order: [["TenTaiKhoan"]],
    // include: [
    //   {
    //     model: NguoiDung,
    //     attributes: ["TenTaiKhoan"], // Chọn thuộc tính bạn muốn hiển thị
    // where: {
    //   TenTaiKhoan: {
    //     [Op.ne]: "a", // Loại bỏ các imgUnBgURL bằng 'a'
    //   },
    // },
    // },
    // ],
  });
  getUsers
    .then((listUsers) => {
      // const paginatedResult = pagination.paginate(listUsers, page, itemsPerPage);
      return res.json({
        success: true,
        data: listUsers,
        message: "List All User Success",
      });
    })
    .catch((err) => {
      return res.json({
        success: false,
        error: err.message,
        message: "List All User Fail",
      });
    });
};

// get thông tin của 1 userID
const getUserInfo = (req, res) => {
  const userID = req.params.TenTaiKhoan;
  User.findByPk(userID, {
    attributes: { exclude: ["MatKhau"] }, // Loại bỏ trường "password" trong kết quả trả về
    // include: [
    //   {
    //     model: ImageUser,
    //     attributes: ["imgUnBgURL"], // Chọn thuộc tính bạn muốn hiển thị
    //   },
    // ],
  })
    .then((user) => {
      // Kiểm tra nếu không tìm thấy người dùng
      if (!user) {
        return res.json({
          success: false,
          data: null,
          message: "User not found",
        });
      }

      // Trả về thông tin người dùng
      return res.json({
        success: true,
        data: user,
        message: "Get User Success",
      });
    })
    .catch((err) => {
      return res.json({
        success: false,
        error: err.message,
        message: "Get User Fail",
      });
    });
};

//list roles của 1 userID
const getUserRoles = (req, res) => {
  const userID = req.params.TenTaiKhoan;

  // Kiểm tra đầu vào (nếu cần)
  if (!userID) {
    return res.json({
      success: false,
      data: null,
      message: "UserID is required",
    });
  }

  sequelize
    .query(
      `SELECT TenTaiKhoan, ChucVu
      FROM nguoidung
      WHERE TenTaiKhoan = ? AND ChucVu = 1`, // Truy vấn tham số hóa
      {
        replacements: [userID], // Truyền giá trị an toàn
        model: NguoiDung,
        mapToModel: true, // Ánh xạ kết quả về model NguoiDung
      }
    )
    .then((roleUser) => {
      // Kiểm tra nếu danh sách rỗng
      if (!roleUser || roleUser.length === 0) {
        return res.json({
          success: false,
          data: null,
          message: "User Role not found",
        });
      }

      // Trả về thông tin người dùng
      return res.json({
        success: true,
        data: roleUser,
        message: "Get Role User Success",
      });
    })
    .catch((err) => {
      // Xử lý lỗi
      return res.json({
        success: false,
        error: err.message,
        message: "Get Role User Fail",
      });
    });
};

module.exports = {
  listUsers,
  getUserInfo,
  getUserRoles,
};

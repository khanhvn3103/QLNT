// const express = require("express");
// const router = express.Router();
// const ThuocController = require("../controllers/ThuocController");
// const LoThuocController = require("../controllers/ThuocController"); // Cần import controller cho LoThuoc
// const { LoThuoc } = require("../models/LoThuoc");
// const { Thuoc } = require("../models/Thuoc");

// // ----------------- Routes cho Thuốc --------------------

// // Route GET để hiển thị tất cả các thuốc
// router.get("/", async (req, res) => {
//   try {
//     const thuocs = await Thuoc.findAll();
//     res.render("listThuoc", { thuocs });
//   } catch (error) {
//     res.status(500).send("Lỗi khi lấy danh sách thuốc");
//   }
// });

// // Route GET để tạo một thuốc mới
// router.get("/create", (req, res) => {
//   res.render("createThuoc"); // Giao diện tạo thuốc mới
// });

// // Route GET để xem chi tiết của một thuốc theo ID
// router.get("/:ThuocID", async (req, res) => {
//   try {
//     const thuoc = await Thuoc.findOne({
//       where: { ThuocID: req.params.ThuocID },
//     });
//     if (!thuoc) {
//       return res.status(404).send("Thuốc không tồn tại.");
//     }
//     res.render("thuocDetails", { thuoc });
//   } catch (error) {
//     res.status(500).send("Lỗi khi lấy thông tin thuốc");
//   }
// });

// // ----------------- Routes cho Lô Thuốc --------------------

// // Route GET để hiển thị danh sách lô thuốc
// router.get("/lothuoc", async (req, res) => {
//   try {
//     const lothuocs = await LoThuoc.findAll();
//     let loThuocDetails = null;

//     if (req.query.loThuocId) {
//       loThuocDetails = await LoThuoc.findOne({
//         where: { LoThuocID: req.query.loThuocId },
//         include: {
//           model: Thuoc, // Thêm bảng Thuoc để lấy chi tiết thuốc trong lô
//           as: "Thuocs", // Alias trong Sequelize
//         },
//       });
//     }

//     res.render("listLoThuoc", {
//       lothuocs: lothuocs,
//       loThuocDetails: loThuocDetails,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Lỗi khi tải dữ liệu");
//   }
// });

// // Route GET để tạo một lô thuốc mới
// router.get("/lothuoc/create", (req, res) => {
//   res.render("createLoThuoc"); // Giao diện để tạo lô thuốc mới
// });

// // Route POST để tạo một lô thuốc mới
// router.post("/lothuoc/create", LoThuocController.createLoThuoc); // Controller tạo lô thuốc

// // Route GET để xem chi tiết một lô thuốc theo LoThuocID
// router.get("/lothuoc/:LoThuocID", LoThuocController.getLoThuocDetails); // Xem chi tiết lô thuốc

// // Route POST để cập nhật thông tin thuốc trong lô thuốc
// router.post(
//   "/lothuoc/update/thuoc/:ThuocID",
//   LoThuocController.updateThuocInLo
// ); // Cập nhật thuốc trong lô

// // Route DELETE để xóa một thuốc khỏi lô thuốc
// router.delete(
//   "/lothuoc/delete/thuoc/:ThuocID",
//   LoThuocController.deleteThuocFromLo
// ); // Xóa thuốc khỏi lô

// module.exports = router;
const express = require("express");
const router = express.Router();
const ThuocController = require("../controllers/ThuocController");
const LoThuocController = require("../controllers/ThuocController"); // Đảm bảo sử dụng đúng controller

// Routes cho lô thuốc
router.get("/lothuoc", LoThuocController.getListLoThuoc);
router.post("/lothuoc", LoThuocController.createLoThuoc); // Tạo lô thuốc mới
router.get("/lothuoc/:LoThuocID", LoThuocController.getLoThuocDetails); // Lấy chi tiết lô thuốc
router.put("/lothuoc/:LoThuocID", LoThuocController.finalizeLoThuoc); // Xác nhận lô thuốc

// Routes cho thuốc
router.get("/", ThuocController.getAllThuoc);
router.put("/:ThuocID", ThuocController.updateThuocInLo); // Chỉnh sửa số lượng thuốc trong lô
router.delete("/:ThuocID", ThuocController.deleteThuocFromLo); // Xóa thuốc khỏi lô

module.exports = router;

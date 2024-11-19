// Import Express
const express = require('express');

// Tạo một router
const router = express.Router();

// Định nghĩa các routes
// Route GET cho danh sách các loại thuốc
router.get('/', (req, res) => {
  res.send('Danh sách thuốc');
});

// Route POST để thêm một loại thuốc mới
router.post('/', (req, res) => {
  res.send('Thêm thuốc mới');
});

// Route GET để lấy thông tin chi tiết một loại thuốc theo ID
router.get('/:id', (req, res) => {
  const thuocId = req.params.id;
  res.send(`Chi tiết thuốc với ID: ${thuocId}`);
});

// Export router
module.exports = router;

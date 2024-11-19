const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Import routes
const thuocRoutes = require('./routes/thuocRoutes');

// Cấu hình kết nối đến MySQL
const db = mysql.createConnection({
    host: 'localhost',// Hoặc địa chỉ IP của máy chủ MySQL
    port: 3306, 
    user: 'root',      // Tên người dùng MySQL
    password: '1234', // Mật khẩu MySQL
    database: 'quanlynhathuoc' // Tên database của bạn
});

// Kết nối đến MySQL
db.connect((err) => {
    if (err) {
        console.error('Kết nối đến MySQL thất bại:', err);
    } else {
        console.log('Kết nối đến MySQL thành công!');
    }
});

// Route cơ bản để kiểm tra
app.get('/', (req, res) => {
    res.send('Xin chào, ứng dụng đã kết nối với cơ sở dữ liệu MySQL!');
});

// Sử dụng routes
app.use('/thuoc', thuocRoutes);

// Khởi động server
app.listen(port, () => {
    console.log(`Ứng dụng đang chạy tại http://localhost:${port}`);
});

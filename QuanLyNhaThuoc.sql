-- Xóa cơ sở dữ liệu nếu tồn tại
DROP DATABASE IF EXISTS `quanlynhathuoc`;

-- Tạo cơ sở dữ liệu mới
CREATE DATABASE IF NOT EXISTS `quanlynhathuoc`;
USE `quanlynhathuoc`;

-- Tạo bảng `khachhang`
CREATE TABLE `khachhang` (
  `SoDienThoai` varchar(15) NOT NULL,
  `HoTen` varchar(100) NOT NULL,
  `Diem` int NOT NULL,
  PRIMARY KEY (`SoDienThoai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dữ liệu mẫu cho bảng `khachhang`
INSERT INTO `khachhang` (`SoDienThoai`, `HoTen`, `Diem`) VALUES
('0909123456', 'Nguyễn Văn A', 100),
('0912345678', 'T-- Xóa cơ sở dữ liệu nếu tồn tại
DROP DATABASE IF EXISTS `quanlynhathuoc`;

-- Tạo cơ sở dữ liệu mới
CREATE DATABASE IF NOT EXISTS `quanlynhathuoc`;
USE `quanlynhathuoc`;

-- Tạo bảng `khachhang`
CREATE TABLE `khachhang` (
  `SoDienThoai` varchar(15) NOT NULL,
  `HoTen` varchar(100) NOT NULL,
  `Diem` int NOT NULL,
  PRIMARY KEY (`SoDienThoai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tạo bảng `lothuoc`
CREATE TABLE `lothuoc` (
  `LoThuocID` int NOT NULL AUTO_INCREMENT,
  `NgayNhap` date NOT NULL,
  `TongTien` float NOT NULL,
  PRIMARY KEY (`LoThuocID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tạo bảng `thuoc`
CREATE TABLE `thuoc` (
  `ThuocID` int NOT NULL,
  `LoThuocID` int NOT NULL,
  `HanSuDung` date NOT NULL,
  `SoLuong` int NOT NULL,
  `TenThuoc` varchar(100) NOT NULL,
  `NgaySanXuat` date NOT NULL,
  `GiaTienNhap` float NOT NULL,
  `GiaTienBan` float NOT NULL,
  PRIMARY KEY (`ThuocID`,`LoThuocID`),
  UNIQUE KEY `ThuocID_UNIQUE` (`ThuocID`),
  KEY `LoThuocID` (`LoThuocID`),
  CONSTRAINT `thuoc_ibfk_1` FOREIGN KEY (`LoThuocID`) REFERENCES `lothuoc` (`LoThuocID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tạo bảng `nguoidung`
CREATE TABLE `nguoidung` (
  `TenTaiKhoan` varchar(50) NOT NULL,
  `MatKhau` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `SoDienThoai` varchar(15) NOT NULL,
  `ChucVu` int NOT NULL,
  `HoTen` varchar(100) NOT NULL,
  `DiaChi` varchar(200) NOT NULL,
  PRIMARY KEY (`TenTaiKhoan`,`Email`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  UNIQUE KEY `TenTaiKhoan_UNIQUE` (`TenTaiKhoan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tạo bảng `hoadon`
CREATE TABLE `hoadon` (
  `HoaDonID` int NOT NULL AUTO_INCREMENT,
  `TenTaiKhoan` varchar(50) NOT NULL,
  `NgayBan` date NOT NULL,
  `MaGiamGiaID` varchar(50) DEFAULT NULL,
  `SoDienThoai` varchar(15) NOT NULL,
  `TongTien` float NOT NULL,
  PRIMARY KEY (`HoaDonID`),
  KEY `TenTaiKhoan` (`TenTaiKhoan`),
  KEY `MaGiamGiaID` (`MaGiamGiaID`),
  KEY `SoDienThoai` (`SoDienThoai`),
  CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`TenTaiKhoan`) REFERENCES `nguoidung` (`TenTaiKhoan`),
  CONSTRAINT `hoadon_ibfk_3` FOREIGN KEY (`SoDienThoai`) REFERENCES `khachhang` (`SoDienThoai`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tạo bảng `chitiethd`
CREATE TABLE `chitiethd` (
  `ThuocID` int NOT NULL,
  `HoaDonID` int NOT NULL,
  `SoLuong` int NOT NULL,
  `DonGia` float NOT NULL,
  PRIMARY KEY (`ThuocID`,`HoaDonID`),
  KEY `HoaDonID` (`HoaDonID`),
  CONSTRAINT `chitiethd_ibfk_1` FOREIGN KEY (`ThuocID`) REFERENCES `thuoc` (`ThuocID`),
  CONSTRAINT `chitiethd_ibfk_2` FOREIGN KEY (`HoaDonID`) REFERENCES `hoadon` (`HoaDonID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tạo bảng `magiamgia`
CREATE TABLE `magiamgia` (
  `MaGiamGiaID` varchar(50) NOT NULL,
  `GiamGia` float NOT NULL,
  PRIMARY KEY (`MaGiamGiaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Chèn dữ liệu mẫu
-- Bảng `khachhang`
INSERT INTO `khachhang` (`SoDienThoai`, `HoTen`, `Diem`) VALUES
('0909123456', 'Nguyễn Văn A', 100),
('0912345678', 'Trần Thị B', 200),
('0987654321', 'Lê Văn C', 150);

-- Bảng `lothuoc`
INSERT INTO `lothuoc` (`LoThuocID`, `NgayNhap`, `TongTien`) VALUES
(1, '2024-01-01', 5000000),
(2, '2024-02-01', 6000000);

-- Bảng `thuoc`
INSERT INTO `thuoc` (`ThuocID`, `LoThuocID`, `HanSuDung`, `SoLuong`, `TenThuoc`, `NgaySanXuat`, `GiaTienNhap`, `GiaTienBan`) VALUES
(1, 1, '2025-12-31', 50, 'Paracetamol', '2024-01-01', 10000, 15000),
(2, 1, '2025-06-30', 100, 'Ibuprofen', '2024-01-01', 20000, 30000),
(3, 2, '2025-11-15', 200, 'Aspirin', '2024-02-01', 15000, 25000);

-- Bảng `nguoidung`
INSERT INTO `nguoidung` (`TenTaiKhoan`, `MatKhau`, `Email`, `SoDienThoai`, `ChucVu`, `HoTen`, `DiaChi`) VALUES
('user1', 'password1', 'user1@example.com', '0909123456', 1, 'Nguyễn Văn A', 'Hà Nội'),
('user2', 'password2', 'user2@example.com', '0912345678', 2, 'Trần Thị B', 'Hồ Chí Minh');

-- Bảng `hoadon`
INSERT INTO `hoadon` (`HoaDonID`, `TenTaiKhoan`, `NgayBan`, `MaGiamGiaID`, `SoDienThoai`, `TongTien`) VALUES
(1, 'user1', '2024-12-08', NULL, '0909123456', 150000),
(2, 'user2', '2024-12-08', NULL, '0912345678', 90000);

-- Bảng `chitiethd`
INSERT INTO `chitiethd` (`ThuocID`, `HoaDonID`, `SoLuong`, `DonGia`) VALUES
(1, 1, 2, 15000),
(2, 2, 3, 30000);rần Thị B', 200),
('0987654321', 'Lê Văn C', 150);

-- Tạo bảng `lothuoc`
CREATE TABLE `lothuoc` (
  `LoThuocID` int NOT NULL AUTO_INCREMENT,
  `NgayNhap` date NOT NULL,
  `TongTien` float NOT NULL,
  PRIMARY KEY (`LoThuocID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dữ liệu mẫu cho bảng `lothuoc`
INSERT INTO `lothuoc` (`NgayNhap`, `TongTien`) VALUES
('2024-01-01', 5000000),
('2024-02-01', 6000000);

-- Tạo bảng `thuoc`
CREATE TABLE `thuoc` (
  `ThuocID` int NOT NULL,
  `LoThuocID` int NOT NULL,
  `HanSuDung` date NOT NULL,
  `SoLuong` int NOT NULL,
  `TenThuoc` varchar(100) NOT NULL,
  `NgaySanXuat` date NOT NULL,
  `GiaTienNhap` float NOT NULL,
  `GiaTienBan` float NOT NULL,
  PRIMARY KEY (`ThuocID`,`LoThuocID`),
  UNIQUE KEY `ThuocID_UNIQUE` (`ThuocID`),
  KEY `LoThuocID` (`LoThuocID`),
  CONSTRAINT `thuoc_ibfk_1` FOREIGN KEY (`LoThuocID`) REFERENCES `lothuoc` (`LoThuocID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dữ liệu mẫu cho bảng `thuoc`
INSERT INTO `thuoc` (`ThuocID`, `LoThuocID`, `HanSuDung`, `SoLuong`, `TenThuoc`, `NgaySanXuat`, `GiaTienNhap`, `GiaTienBan`) VALUES
(1, 1, '2025-12-31', 50, 'Paracetamol', '2024-01-01', 10000, 15000),
(2, 1, '2025-06-30', 100, 'Ibuprofen', '2024-01-01', 20000, 30000),
(3, 2, '2025-11-15', 200, 'Aspirin', '2024-02-01', 15000, 25000);

-- Tạo bảng `nguoidung`
CREATE TABLE `nguoidung` (
  `TenTaiKhoan` varchar(50) NOT NULL,
  `MatKhau` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `SoDienThoai` varchar(15) NOT NULL,
  `ChucVu` int NOT NULL,
  `HoTen` varchar(100) NOT NULL,
  `DiaChi` varchar(200) NOT NULL,
  PRIMARY KEY (`TenTaiKhoan`,`Email`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  UNIQUE KEY `TenTaiKhoan_UNIQUE` (`TenTaiKhoan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dữ liệu mẫu cho bảng `nguoidung`
INSERT INTO `nguoidung` (`TenTaiKhoan`, `MatKhau`, `Email`, `SoDienThoai`, `ChucVu`, `HoTen`, `DiaChi`) VALUES
('user1', 'password1', 'user1@example.com', '0909123456', 1, 'Nguyễn Văn A', 'Hà Nội'),
('user2', 'password2', 'user2@example.com', '0912345678', 2, 'Trần Thị B', 'Hồ Chí Minh');

-- Tạo bảng `hoadon`
CREATE TABLE `hoadon` (
  `HoaDonID` int NOT NULL AUTO_INCREMENT,
  `TenTaiKhoan` varchar(50) NOT NULL,
  `NgayBan` date NOT NULL,
  `MaGiamGiaID` varchar(50) DEFAULT NULL,
  `SoDienThoai` varchar(15) NOT NULL,
  `TongTien` float NOT NULL,
  PRIMARY KEY (`HoaDonID`),
  KEY `TenTaiKhoan` (`TenTaiKhoan`),
  KEY `MaGiamGiaID` (`MaGiamGiaID`),
  KEY `SoDienThoai` (`SoDienThoai`),
  CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`TenTaiKhoan`) REFERENCES `nguoidung` (`TenTaiKhoan`),
  CONSTRAINT `hoadon_ibfk_3` FOREIGN KEY (`SoDienThoai`) REFERENCES `khachhang` (`SoDienThoai`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dữ liệu mẫu cho bảng `hoadon`
INSERT INTO `hoadon` (`TenTaiKhoan`, `NgayBan`, `MaGiamGiaID`, `SoDienThoai`, `TongTien`) VALUES
('user1', '2024-12-08', NULL, '0909123456', 150000),
('user2', '2024-12-08', 'DISCOUNT10', '0912345678', 200000);

-- Tạo bảng `chitiethd`
CREATE TABLE `chitiethd` (
  `ThuocID` int NOT NULL,
  `HoaDonID` int NOT NULL,
  `SoLuong` int NOT NULL,
  `DonGia` float NOT NULL,
  PRIMARY KEY (`ThuocID`,`HoaDonID`),
  KEY `HoaDonID` (`HoaDonID`),
  CONSTRAINT `chitiethd_ibfk_1` FOREIGN KEY (`ThuocID`) REFERENCES `thuoc` (`ThuocID`),
  CONSTRAINT `chitiethd_ibfk_2` FOREIGN KEY (`HoaDonID`) REFERENCES `hoadon` (`HoaDonID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dữ liệu mẫu cho bảng `chitiethd`
INSERT INTO `chitiethd` (`ThuocID`, `HoaDonID`, `SoLuong`, `DonGia`) VALUES
(1, 1, 2, 15000),
(2, 2, 3, 30000);

-- Tạo bảng `magiamgia`
CREATE TABLE `magiamgia` (
  `MaGiamGiaID` varchar(50) NOT NULL,
  `GiamGia` float NOT NULL,
  PRIMARY KEY (`MaGiamGiaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dữ liệu mẫu cho bảng `magiamgia`
INSERT INTO `magiamgia` (`MaGiamGiaID`, `GiamGia`) VALUES
('DISCOUNT10', 10),
('DISCOUNT20', 20);

-- Xóa cơ sở dữ liệu nếu tồn tại
DROP DATABASE IF EXISTS `quanlynhathuoc`;

-- Tạo cơ sở dữ liệu mới
CREATE DATABASE `quanlynhathuoc`;
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

-- Tạo bảng `hoadon` với ràng buộc ON DELETE CASCADE
CREATE TABLE `hoadon` (
  `HoaDonID` int NOT NULL AUTO_INCREMENT,
  `TenTaiKhoan` varchar(50) NULL,
  `NgayBan` date NOT NULL,
  `MaGiamGiaID` varchar(50) DEFAULT NULL,
  `SoDienThoai` varchar(15) NOT NULL,
  `TongTien` float NOT NULL,
  PRIMARY KEY (`HoaDonID`),
  KEY `MaGiamGiaID` (`MaGiamGiaID`),
  KEY `SoDienThoai` (`SoDienThoai`),
  CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`SoDienThoai`) REFERENCES `khachhang` (`SoDienThoai`)
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
  `beginAt` date NULL DEFAULT NULL,
  `endAt` date NULL DEFAULT NULL,
  `GiamGia` float NOT NULL,
  PRIMARY KEY (`MaGiamGiaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

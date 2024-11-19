CREATE DATABASE quanlynhathuoc;
USE quanlynhathuoc;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: quanlynhathuoc
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chitiethd`
--

DROP TABLE IF EXISTS `chitiethd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitiethd` (
  `ThuocID` int NOT NULL,
  `HoaDonID` int NOT NULL,
  `SoLuong` int DEFAULT NULL,
  `DonGia` float DEFAULT NULL,
  PRIMARY KEY (`ThuocID`,`HoaDonID`),
  KEY `HoaDonID` (`HoaDonID`),
  CONSTRAINT `chitiethd_ibfk_1` FOREIGN KEY (`ThuocID`) REFERENCES `thuoc` (`ThuocID`),
  CONSTRAINT `chitiethd_ibfk_2` FOREIGN KEY (`HoaDonID`) REFERENCES `hoadon` (`HoaDonID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitiethd`
--

LOCK TABLES `chitiethd` WRITE;
/*!40000 ALTER TABLE `chitiethd` DISABLE KEYS */;
/*!40000 ALTER TABLE `chitiethd` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoadon`
--

DROP TABLE IF EXISTS `hoadon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoadon` (
  `HoaDonID` int NOT NULL AUTO_INCREMENT,
  `TenTaiKhoan` varchar(50) DEFAULT NULL,
  `NgayBan` date DEFAULT NULL,
  `MaGiamGiaID` int DEFAULT NULL,
  `SoDienThoai` varchar(15) DEFAULT NULL,
  `TongTien` float DEFAULT NULL,
  PRIMARY KEY (`HoaDonID`),
  KEY `TenTaiKhoan` (`TenTaiKhoan`),
  KEY `MaGiamGiaID` (`MaGiamGiaID`),
  KEY `SoDienThoai` (`SoDienThoai`),
  CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`TenTaiKhoan`) REFERENCES `nguoidung` (`TenTaiKhoan`),
  CONSTRAINT `hoadon_ibfk_2` FOREIGN KEY (`MaGiamGiaID`) REFERENCES `magiamgia` (`MaGiamGiaID`),
  CONSTRAINT `hoadon_ibfk_3` FOREIGN KEY (`SoDienThoai`) REFERENCES `khachhang` (`SoDienThoai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoadon`
--

LOCK TABLES `hoadon` WRITE;
/*!40000 ALTER TABLE `hoadon` DISABLE KEYS */;
/*!40000 ALTER TABLE `hoadon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khachhang`
--

DROP TABLE IF EXISTS `khachhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khachhang` (
  `SoDienThoai` varchar(15) NOT NULL,
  `HoTen` varchar(100) DEFAULT NULL,
  `Diem` int DEFAULT NULL,
  PRIMARY KEY (`SoDienThoai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khachhang`
--

LOCK TABLES `khachhang` WRITE;
/*!40000 ALTER TABLE `khachhang` DISABLE KEYS */;
/*!40000 ALTER TABLE `khachhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lothuoc`
--

DROP TABLE IF EXISTS `lothuoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lothuoc` (
  `LoThuocID` int NOT NULL AUTO_INCREMENT,
  `NgayNhap` date DEFAULT NULL,
  `TongTien` float DEFAULT NULL,
  PRIMARY KEY (`LoThuocID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lothuoc`
--

LOCK TABLES `lothuoc` WRITE;
/*!40000 ALTER TABLE `lothuoc` DISABLE KEYS */;
/*!40000 ALTER TABLE `lothuoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `magiamgia`
--

DROP TABLE IF EXISTS `magiamgia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `magiamgia` (
  `MaGiamGiaID` int NOT NULL AUTO_INCREMENT,
  `GiamGia` float DEFAULT NULL,
  PRIMARY KEY (`MaGiamGiaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `magiamgia`
--

LOCK TABLES `magiamgia` WRITE;
/*!40000 ALTER TABLE `magiamgia` DISABLE KEYS */;
/*!40000 ALTER TABLE `magiamgia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoidung`
--

DROP TABLE IF EXISTS `nguoidung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguoidung` (
  `TenTaiKhoan` varchar(50) NOT NULL,
  `MatKhau` varchar(100) NOT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `SoDienThoai` varchar(15) DEFAULT NULL,
  `ChucVu` int DEFAULT NULL,
  `HoTen` varchar(100) DEFAULT NULL,
  `DiaChi` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`TenTaiKhoan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoidung`
--

LOCK TABLES `nguoidung` WRITE;
/*!40000 ALTER TABLE `nguoidung` DISABLE KEYS */;
/*!40000 ALTER TABLE `nguoidung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thuoc`
--

DROP TABLE IF EXISTS `thuoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thuoc` (
  `ThuocID` int NOT NULL,
  `LoThuocID` int NOT NULL,
  `HanSuDung` date DEFAULT NULL,
  `SoLuong` int DEFAULT NULL,
  `TenThuoc` varchar(100) DEFAULT NULL,
  `NgaySanXuat` date DEFAULT NULL,
  `GiaTien` float DEFAULT NULL,
  PRIMARY KEY (`ThuocID`,`LoThuocID`),
  KEY `LoThuocID` (`LoThuocID`),
  CONSTRAINT `thuoc_ibfk_1` FOREIGN KEY (`LoThuocID`) REFERENCES `lothuoc` (`LoThuocID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thuoc`
--

LOCK TABLES `thuoc` WRITE;
/*!40000 ALTER TABLE `thuoc` DISABLE KEYS */;
/*!40000 ALTER TABLE `thuoc` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-19 22:49:39

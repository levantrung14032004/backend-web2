-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2024 at 04:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `comicola`
--

-- --------------------------------------------------------

--
-- Table structure for table `addressdetail`
--

CREATE TABLE `addressdetail` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `phone_number` varchar(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `province` text NOT NULL,
  `district` text NOT NULL,
  `ward` text NOT NULL,
  `detail` text NOT NULL,
  `status` int(11) NOT NULL,
  `setdefault` enum('1','0') DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `addressdetail`
--

INSERT INTO `addressdetail` (`id`, `id_user`, `firstName`, `lastName`, `phone_number`, `email`, `province`, `district`, `ward`, `detail`, `status`, `setdefault`) VALUES
(13, 14, 'Nguyễn Công Trung', 'Nguyễn Công Trung', '0902345678', 'nguyencongtrung13@gmail.com', 'Thành phố Hồ Chí Minh', 'Huyện Bình Chánh', 'Xã Vĩnh Lộc B', 'Tổ 10, ấp 1', 1, ''),
(14, 14, 'Nguyễn Công Trung', 'Nguyễn Công Trung', '0902345678', 'nguyencongtrung13@gmail.com', 'Tỉnh Tuyên Quang', 'Thành phố Tuyên Quang', 'Xã Lưỡng Vượng', 'dầ', 1, '1'),
(15, 14, 'Nguyễn', 'Công Trung', '0902345678', 'nguyencongtrung13@gmail.com', 'Tỉnh Phú Thọ', 'Huyện Thanh Thuỷ', 'Xã Đoan Hạ', 'dầ', 1, '0'),
(20, 15, 'Nguyễn', 'Công Trung', '0902345678', 'nguyencongtrung13@gmail.com', 'Thành phố Hồ Chí Minh', 'Quận Bình Tân', 'Phường Bình Trị Đông A', 'đại', 1, '1');

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

CREATE TABLE `author` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `thumbnail` varchar(500) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `information` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`id`, `name`, `thumbnail`, `status`, `information`) VALUES
(1, 'Đặng Ngọc Minh Trang', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/5bf97135-2fec-4d82-5dd8-ef4c4967c000/w=500', 1, NULL),
(2, 'Can Tiểu Hy', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/1486a146-a908-4984-aee7-595ffd793f00/w=640', 1, NULL),
(3, 'Châu Chặt Chém', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/6e3681fe-448b-460a-9d04-fc1719106700/w=600', 1, NULL),
(4, 'Dương Minh Đức', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/ccc02bc0-e130-491c-8dd7-c2b589872f00/w=1024,h=683', 1, NULL),
(5, 'Dương Thạch Thảo (Nie)', 'https://shop.comicola.com/wp-content/uploads/2021/06/IMG_0844m-2-768x1024-1.jpg', 1, NULL),
(6, 'Lê Vũ Kiến Duy', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/c3653002-26f2-4ae5-c5ee-fa282fb32e00/w=400', 1, NULL),
(7, 'Nam Thanh', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/add861e0-23c1-40c1-a007-7f89824ab100/w=360,h=360', 1, NULL),
(8, 'Phong Dương Comics', NULL, 1, NULL),
(9, 'Tuyết Tuyết', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/ef47551f-d568-4602-c6fe-026cbda38400/w=1440', 1, NULL),
(10, 'Vuy', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/c19529a1-72f5-4dc9-fddf-ca26b577a700/w=270,h=360', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id_user` int(11) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(18,2) NOT NULL,
  `total_price` decimal(18,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id_user`, `id_product`, `quantity`, `price`, `total_price`) VALUES
(13, 6, 1, 48150.00, 48150.00),
(13, 20, 1, 133750.00, 133750.00),
(13, 6, 1, 48150.00, 48150.00),
(13, 6, 1, 48150.00, 48150.00);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL COMMENT 'Khóa chính',
  `name` varchar(255) NOT NULL COMMENT 'Tên loại',
  `status` int(11) NOT NULL COMMENT 'Trạng thái'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `status`) VALUES
(1, 'Sách Ảnh', 1),
(2, 'Sách Nghiên Cứu Văn Hóa - Lịch Sử', 1),
(3, 'Tiểu Thuyết', 1),
(4, 'Truyện Một Tập', 1),
(5, 'Truyện Nhiều Tập', 1),
(6, 'Truyện Tranh Nước Ngoài', 1),
(7, 'Truyện Tranh Việt Nam', 1),
(8, 'Truyện VN Đạt Giải Quốc Tế', 1),
(9, 'Truyện ngắn - Tản văn - Tạp văn', 1);

-- --------------------------------------------------------

--
-- Table structure for table `company_delivery`
--

CREATE TABLE `company_delivery` (
  `id` int(11) NOT NULL,
  `name` varchar(225) NOT NULL,
  `discount` float NOT NULL,
  `status` enum('running','stopped') DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `company_delivery`
--

INSERT INTO `company_delivery` (`id`, `name`, `discount`, `status`, `description`) VALUES
(1, 'Nhà xuất bản Hồng Hạc', 4.2, 'running', 'Liên hệ qua: 0967435226| Địa chỉ: 27/8 Lạc Long Quân, phường 5, quận 11, TP.Hồ Chí Minh'),
(2, 'Nhà xuất bản Sự Thật', 7, 'running', 'Liên hệ qua: 0967435226| Địa chỉ: 273 An Dương Vương, quận 5, TP.Hồ Chí Minh'),
(3, 'Nhà xuất bản Kim Đồng', 4, 'running', 'Trụ sở chính ở Hà Nội'),
(4, 'Nhà Xuất Bản Tp.HCM', 5, 'stopped', 'Trụ sợ chính tại Hồ Chí Minh');

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `id` int(11) NOT NULL,
  `coupon_code` varchar(50) DEFAULT NULL,
  `discount_value` varchar(50) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `value_apply` decimal(18,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupon`
--

INSERT INTO `coupon` (`id`, `coupon_code`, `discount_value`, `created_date`, `expiration_date`, `value_apply`) VALUES
(1, 'C001', '12%', '2024-09-16', '2025-09-16', 500000.00),
(2, 'C002', '15%', '2024-09-16', '2025-09-16', 1500000.00),
(3, 'C003', '100%', '2024-09-16', '2025-09-16', 10000.00),
(4, 'HINEWMEMBER', '10%', NULL, '2026-06-06', 200000.00);

-- --------------------------------------------------------

--
-- Table structure for table `coupon_for_user`
--

CREATE TABLE `coupon_for_user` (
  `id_user` int(11) NOT NULL,
  `id_coupon` int(11) NOT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupon_for_user`
--

INSERT INTO `coupon_for_user` (`id_user`, `id_coupon`, `status`) VALUES
(13, 4, 1),
(13, 1, 1),
(13, 4, 1),
(13, 1, 1),
(14, 4, 1),
(14, 1, 1),
(15, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `address` varchar(200) NOT NULL,
  `status` int(11) NOT NULL,
  `refreshToken` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `role_id`, `fullname`, `email`, `password`, `phone_number`, `address`, `status`, `refreshToken`) VALUES
(1, 2, '', 'trungle@gmail.com', 'hashpassword', '', '', 1, NULL),
(2, 4, 'KhanhKoy', 'khanhpp2004@gmail.com', 'khanh12345', '0937654321', '99 ADV', 1, NULL),
(6, 2, 'Man United', 'manunited.levantrung@gmail.com', '$2b$10$0mRpPxVvbsQkORlQHwF3cul6TkU.e7zWsIwkH8C974wg9CQCPFDk2', '0976335338', 'Binh Thuan', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Niwicm9sZV9pZCI6MiwiZW1haWwiOiJtYW51bml0ZWQubGV2YW50cnVuZ0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQwbVJwUHhWdmJzUWtPUmxRSHdGM2N1bDZUa1UuZTd6V3NJd2tIOEM5NzR3ZzlDUUNQRkRrMiIsImFjdGlvblJvbGUiOlt7ImFjdGlvbl9jb2RlIjoiQ1JFQVRFIiwiY2hlY2tfYWN0aW9uIjoxfSx7ImFjdGlvbl9jb2RlIjoiRURJVCIsImNoZWNrX2FjdGlvbiI6MX0seyJhY3Rpb25fY29kZSI6IkRFTEVURSIsImNoZWNrX2FjdGlvbiI6MX0seyJhY3Rpb25fY29kZSI6IlZJRVciLCJjaGVja19hY3Rpb24iOjF9XSwiaWF0IjoxNzI5NTg3NjMzLCJleHAiOjE3MzAxOTI0MzN9.l55P1mLtZyex094ikaLBo6XQX-Ad14CdIYGdUV_hejE'),
(7, 7, 'Cong Trung', 'congtrung@gmail.com', '$2b$10$uDbdp6O4vvbDdPzVjMy7Rujho74A7DXX2qzEjMpUB0KCGrXUEIXS2', '0976335338', 'HCM', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZV9pZCI6NywiZW1haWwiOiJjb25ndHJ1bmdAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkdURiZHA2TzR2dmJEZFB6VmpNeTdSdWpobzc0QTdEWFgycXpFak1wVUIwS0NHclhVRUlYUzIiLCJhY3Rpb25Sb2xlIjpbeyJhY3Rpb25fY29kZSI6IkNSRUFURSIsImNoZWNrX2FjdGlvbiI6MX0seyJhY3Rpb25fY29kZSI6IkVESVQiLCJjaGVja19hY3Rpb24iOjF9LHsiYWN0aW9uX2NvZGUiOiJERUxFVEUiLCJjaGVja19hY3Rpb24iOjB9LHsiYWN0aW9uX2NvZGUiOiJWSUVXIiwiY2hlY2tfYWN0aW9uIjoxfV0sImlhdCI6MTczMDE4OTIxNywiZXhwIjoxNzMwNzk0MDE3fQ.qxmSLMUEj0h6EDH_n3KVGPfWpXZRdfScCRz5xk5mRFE');

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL COMMENT 'Khóa chính',
  `product_id` int(11) NOT NULL COMMENT 'Khóa ngoại tham chiếu đến bảng products',
  `thumbnail` varchar(500) NOT NULL COMMENT 'Hình ảnh thu nhỏ',
  `status` int(11) NOT NULL COMMENT 'Trạng thái'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `product_id`, `thumbnail`, `status`) VALUES
(1, 1, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/35919ba9-2db2-4cdf-6fa8-871469353800/w=705', 1),
(2, 1, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/99ca76f4-0425-4504-4dee-c2b948384000/w=705', 1),
(3, 1, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/bea8ff25-482d-4b07-7f11-b39609bc7400/w=705', 1),
(4, 1, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/142c6a82-d10d-4f09-9915-3602425f2500/w=705', 1),
(5, 1, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/650ab3db-f83e-4cc9-7e2d-11a221b93000/w=705', 1),
(6, 2, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/983fdd36-45d2-4abc-831c-2641efcb7d00/w=705', 1),
(7, 2, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/332109a0-8660-4dd0-66bc-0d49b8f99b00/w=705', 1),
(8, 2, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/6c956207-7871-4602-926b-3520e5e85a00/w=705', 1),
(9, 2, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/8f516850-621e-4585-65b9-272974bfff00/w=705', 1),
(10, 2, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/8a0a193e-0c0d-4a61-48e7-899f2a59fc00/w=705', 1),
(11, 3, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/ef280a01-24ac-4894-843f-3ccef4fc3f00/w=705', 1),
(12, 3, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/702f66a4-525b-482c-f1a1-469408d4ef00/w=210', 1),
(13, 3, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/3fb5c2a6-51aa-4ad2-ebb2-93641d691000/w=705', 1),
(14, 3, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/7f6a123d-605d-4108-bfae-2f2be8242f00/w=705', 1),
(15, 3, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/06c9ad48-0349-4d21-75b4-4d04e89a0600/w=705', 1),
(16, 3, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/91dd15a4-4cb6-4382-fd57-eb2c4baa2500/w=705', 1),
(17, 3, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/51a1ec9c-6c2c-4cf9-f819-b7f78edc4200/w=705', 1),
(18, 4, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/bf1502ce-cede-433d-e678-82bdfb352500/w=705', 1),
(19, 4, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/2e94b8ff-3ed2-4217-32af-cdf5e5e00b00/w=705', 1),
(20, 4, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/eca15aad-2b60-457e-a0dd-afbd7da97900/w=705', 1),
(21, 4, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/7d721d60-6e20-45eb-6e08-b6431aba0600/w=705', 1),
(22, 5, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/a230721c-e62a-41df-65de-2a5822ddec00/w=705', 1),
(23, 5, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/952e46de-579b-4b4d-c38c-0417c9c6e400/w=705', 1),
(24, 5, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/c7871acd-28f1-451a-d527-3a749d539200/w=705', 1),
(25, 5, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/a5350291-d912-428c-9daa-00acc48aff00/w=705', 1),
(26, 5, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/aa3e2e78-8e76-4ee3-86bc-40386272fa00/w=705', 1),
(27, 5, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/72f6bf65-55f3-4a73-8a53-2bb8ea634700/w=705', 1),
(28, 6, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/bec5a347-adf6-46b7-46f2-92c5cf2f5000/w=705', 1),
(29, 6, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/74708cc5-6fd3-4f98-f0f9-1e0d17e1b900/w=705', 1),
(30, 7, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/56b0b4b6-f833-46d6-47e7-08ba5a4d2100/w=705', 1),
(31, 7, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/4d7aea10-b303-4679-9165-18187e126c00/w=705', 1),
(32, 8, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/878c7553-6989-4a79-1036-353847ab6500/w=705', 1),
(33, 8, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/8916ef30-9278-42a4-3ed8-ac28d4938400/w=705', 1),
(34, 9, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/5daf7980-155c-4d08-27d9-cbce007bcb00/w=705', 1),
(35, 9, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/4585e69a-156b-4f65-fbbe-1f28c2d88300/w=705', 1),
(36, 10, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/f9e27daa-40cf-499a-a246-b166f5634100/w=705', 1),
(37, 10, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/7eb16712-39e8-491e-0964-38ce1dbc1100/w=705', 1),
(38, 11, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/6e2ea6c4-4399-4765-b466-61522587e900/w=705', 1),
(39, 11, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/50359a21-fc23-4f1f-7d5f-192742285e00/w=705', 1),
(40, 11, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/5acd5c20-86c5-4ad2-b18b-4be201ad1400/w=705', 1),
(41, 12, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/80f4eb54-1321-4f3a-c152-1b11c8017f00/w=705', 1),
(42, 12, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/4bfde984-0b75-453f-fbd3-39b96bc20700/w=705', 1),
(43, 12, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/484390a2-fde0-423c-fc65-695f85be9c00/w=705', 1),
(44, 12, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/41593293-41f9-4f64-6952-00a28e2dd900/w=705', 1),
(45, 13, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/85a47ea9-ec69-4447-38b1-32941e7c3a00/w=705', 1),
(46, 13, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/1441e3d8-24bb-4c46-d18e-58f45378e600/w=705', 1),
(47, 13, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/04a74c31-85ee-40dd-a50c-aa1d3d477300/w=705', 1),
(48, 13, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/5bb78ec7-cd11-49f1-3085-9a27f5088000/w=705', 1),
(49, 13, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/42e40be3-9030-4a89-7f56-d03c947b9d00/w=705', 1),
(50, 13, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/b15a3a7e-0b3a-4fe6-7799-49135ca35c00/w=705', 1),
(51, 14, 'https://shop.comicola.com/wp-content/uploads/2024/03/BL07_NEN-XAM_7.png', 1),
(52, 14, 'https://shop.comicola.com/wp-content/uploads/2024/03/BL07_NEN-XAM_6.png', 1),
(53, 14, 'https://shop.comicola.com/wp-content/uploads/2024/03/BL07_NEN-XAM_4.png', 1),
(54, 14, 'https://shop.comicola.com/wp-content/uploads/2024/03/BL07_NEN-XAM_5.png', 1),
(55, 14, 'https://shop.comicola.com/wp-content/uploads/2024/03/BL07_NEN-XAM_2.png', 1),
(56, 14, 'https://shop.comicola.com/wp-content/uploads/2024/03/BL07_NEN-XAM_9.png', 1),
(57, 14, 'https://shop.comicola.com/wp-content/uploads/2024/03/BL07_NEN-XAM_8.png', 1),
(58, 14, 'https://shop.comicola.com/wp-content/uploads/2024/03/BL07_NEN-XAM_3.png', 1),
(59, 15, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/ca251129-fbf8-44fe-66a7-1acd78e2cd00/w=705', 1),
(60, 15, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/2257a019-eafc-4d52-86b4-bd9d75736400/w=705', 1),
(61, 15, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/ea6a5ceb-41ce-49b2-59ce-f74d34185f00/w=705', 1),
(62, 15, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/8fadf8bb-08b5-4cce-9c5d-39c0c09f7200/w=705', 1),
(63, 15, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/a3cc6bfb-6c7c-482b-c1fe-636e8a8b7500/w=705', 1),
(64, 15, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/59cc77e3-8ae4-42db-5faa-9202a0e3f400/w=705', 1),
(65, 15, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/3328ab00-26eb-43b9-b96d-a31baec08300/w=705', 1),
(66, 15, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/7f8513ca-8399-4f35-ef0e-b97a8d6a4400/w=705', 1),
(67, 16, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/a329e809-ea00-42b3-f40f-8cbca961b400/w=705', 1),
(68, 16, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/8f4eda03-1a54-47db-f9c7-ab77e703f300/w=705', 1),
(69, 17, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/ad9ef303-b9ec-47dd-4170-41f59211fa00/w=210', 1),
(70, 17, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/2a19ec35-5d3b-40af-6989-de3f37b7f300/w=210', 1),
(71, 17, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/9bdea042-9f1d-4ab7-1c0b-4b760dd27800/w=210', 1),
(72, 17, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/6836c4ed-e1d4-4baf-c763-1d15a317bc00/w=210', 1),
(73, 18, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/bb384de1-8f08-476e-5af3-3c6a88367200/w=210', 1),
(74, 18, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/33322b41-a0b3-4ce0-2995-1df19abd1100/w=210', 1),
(75, 18, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/e5f51056-ec8c-447e-6f58-4712460f5600/w=210', 1),
(76, 18, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/b0f30ce7-1868-4bca-d333-8c9dd5090d00/w=210', 1),
(77, 19, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/9c5ea263-2643-4bdb-0ed5-566d34ab3100/w=210', 1),
(78, 19, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/489712a5-b4ba-471e-7e3b-6d23beb7e300/w=210', 1),
(79, 19, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/99bd7dfa-0c2c-442c-0d9b-9555cf59aa00/w=210', 1),
(80, 19, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/d2acd69a-f74c-411e-17e8-9bce20948600/w=210', 1),
(81, 19, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/6ad8f3ba-5922-4552-a698-956896399800/w=210', 1),
(82, 19, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/03bb5547-998c-418e-28e6-564e1321bf00/w=210', 1),
(83, 19, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/559c46ca-a37b-4c77-72ba-14c589699e00/w=210', 1),
(84, 19, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/69ec5069-11e4-47a5-884a-cf8da08e2000/w=210', 1),
(85, 19, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/e18ca8a9-353a-4204-ffe3-92e8f889a700/w=210', 1),
(86, 19, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/3ffdb4b6-9d6b-46df-16c8-42381233eb00/w=210', 1),
(87, 19, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/739f57d5-2fbb-469e-ce7b-7a40f3a6e100/w=210', 1),
(88, 19, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/a8a1d1d1-6596-43d5-c86c-ec3c3240da00/w=210', 1),
(89, 20, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/6d9f21c3-6a6f-4084-c58c-527ae106c400/w=705', 1),
(90, 20, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/50ada5c6-07b4-43a0-0524-57c97176bb00/w=705', 1),
(91, 20, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/01cdfffd-d33b-41a9-8719-0fdc92af8100/w=705', 1),
(92, 20, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/8506f5eb-81f2-4d06-902d-4854307efd00/w=705', 1),
(93, 20, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/53a3709d-28d1-43af-e2c7-8adc457e8d00/w=705', 1),
(94, 20, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/b3f6f4fc-375f-4cab-7e58-cc5e50d35800/w=705', 1),
(95, 21, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/0f02e705-8a5b-42ee-5791-019608ffc900/w=210', 1),
(96, 21, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/1d479906-1abd-4aea-84ba-9c6b00669500/w=210', 1),
(97, 22, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/6d7057f9-d429-40f9-2f1e-7fdf2b837800/w=705', 1),
(98, 22, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/f77c1fe1-2619-4c69-b88a-1243be045a00/w=705', 1),
(99, 22, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/efcd2421-1d06-4f94-1fd0-f197880d9900/w=705', 1),
(100, 22, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/545e7f8c-0fe8-47d3-2170-f400238ee200/w=705', 1),
(101, 22, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/5f7a9c2e-6f08-4a86-727a-12e77c466400/w=705', 1),
(102, 23, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/f77c1fe1-2619-4c69-b88a-1243be045a00/w=705', 1),
(103, 23, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/efcd2421-1d06-4f94-1fd0-f197880d9900/w=705', 1),
(104, 23, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/591844c0-e80e-4552-194e-47cca1353a00/w=705', 1),
(105, 23, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/66992ca1-31b8-4ed7-859a-1b6f9e368800/w=705', 1),
(106, 23, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/53dc6a58-e99e-42e3-00e0-aca4bb908c00/w=705', 1),
(107, 23, 'https://shop.comicola.com/wp-content/uploads/2022/09/DB_mat-sau.jpg', 1),
(108, 23, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/287f739f-cc16-4b6d-f8a2-b6e3014bf800/w=705', 1),
(109, 24, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/792e5ba1-8b8f-4125-246d-f449b5ab3700/w=705', 1),
(110, 24, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/cc0c590c-62cb-42bf-a7bc-c7928f686100/w=705', 1),
(111, 25, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/099a5de4-8e7e-4da8-1baf-d4f477c1e800/w=705', 1),
(112, 25, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/0b38fbe4-fb35-4a03-1481-dc987806e100/w=705', 1),
(113, 26, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/18c1a939-c2b9-4545-19e4-73227444dd00/w=705', 1),
(114, 26, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/492aab84-9f70-4031-f4b7-82231b4d0800/w=705', 1),
(115, 27, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/c51c2cf2-658b-42f6-e91c-c8d09ff1b600/w=705', 1),
(116, 27, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/2b1a82d4-8d56-4d2f-3800-f4e82df72d00/w=705', 1),
(117, 27, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/f3917510-763c-473d-547c-cb6e1ed34700/w=705', 1),
(118, 27, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/04841b27-a3c0-4a12-0dfb-41debc3b6300/w=705', 1),
(119, 27, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/0c7252cf-100d-45a3-3883-39eba3120900/w=705', 1),
(120, 28, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/0264cc1b-6b47-431a-3f2a-1a4b7ddc6f00/w=210', 1),
(121, 28, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/e96bba40-abc5-4217-2910-938868c21500/w=210', 1),
(122, 29, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/9bcfc2bf-3497-4897-5a86-fdf67b089600/w=210', 1),
(123, 29, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/1e144e81-cb06-43cf-c7ec-05f01200ef00/w=210', 1),
(124, 30, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/e4069a92-1aaf-42fa-627a-f5acc2aca500/w=210', 1),
(125, 30, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/acdd0329-b433-4df2-5fd4-638c88f21200/w=210', 1),
(126, 31, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/9bcfc2bf-3497-4897-5a86-fdf67b089600/w=210', 1),
(127, 31, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/1e144e81-cb06-43cf-c7ec-05f01200ef00/w=210', 1),
(128, 32, 'https://shop.comicola.com/wp-content/uploads/2024/03/DDO_PT.jpg', 1),
(129, 32, 'https://shop.comicola.com/wp-content/uploads/2024/03/DDO_2.jpg', 1),
(130, 32, 'https://shop.comicola.com/wp-content/uploads/2024/03/DDO_3-210x270.jpg', 1),
(131, 32, 'https://shop.comicola.com/wp-content/uploads/2024/03/DDO_4-210x270.jpg', 1),
(132, 33, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/ee78ffde-01bc-4619-5ef5-4bfcf6234c00/w=210', 1),
(133, 33, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/b80feaf5-f5d3-4de9-579a-2dc169e6df00/w=210', 1),
(134, 34, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/9b668af8-49b4-4da3-b635-31c805725100/w=210', 1),
(135, 34, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/118c8f05-39f1-40bb-3710-20273ea9d000/w=210', 1),
(136, 35, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/44e0ad27-1d68-4168-de0d-e4bf94279b00/w=210', 1),
(137, 35, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/3aa68734-d5e4-4b4d-b776-86a9fccb3800/w=210', 1),
(138, 36, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/d9be846c-e51d-4594-94a9-5d86871afe00/w=210', 1),
(139, 36, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/bac589e1-8e1b-4bab-2f10-402db26d8b00/w=210', 1),
(140, 37, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/bf78912f-87da-4d13-d007-3d47d93d9700/w=210', 1),
(141, 37, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/6acab167-4243-4148-cd21-73a7b91a0000/w=210', 1),
(142, 165, 'http://localhost/WriteResfulAPIPHP/admin/product/uploads/663e3ccc349bd_w=705 (1).avif', 1),
(143, 165, 'http://localhost/WriteResfulAPIPHP/admin/product/uploads/663e3ccc34e88_w=705.avif', 1),
(144, 166, 'http://localhost/WriteResfulAPIPHP/admin/product/uploads/663ee983b9548_w=705 (1).avif', 1),
(145, 166, 'http://localhost/WriteResfulAPIPHP/admin/product/uploads/663ee983b97c3_w=705.avif', 1),
(146, 167, 'http://localhost/WriteResfulAPIPHP/admin/product/uploads/663eea1dc2152_3.avif', 1),
(147, 167, 'http://localhost/WriteResfulAPIPHP/admin/product/uploads/663eea1dc2579_2.avif', 1),
(148, 168, 'http://localhost/WriteResfulAPIPHP/admin/product/uploads/66409f6154a50_3.avif', 1),
(149, 168, 'http://localhost/WriteResfulAPIPHP/admin/product/uploads/66409f615506c_2.avif', 1),
(150, 169, 'https://firebasestorage.googleapis.com/v0/b/cnpm-c8641.appspot.com/o/files%2FScreenshot%202023-05-28%20221720.png?alt=media&token=e29c00ba-58e3-4e33-8840-945d16e459d8', 1),
(151, 169, 'https://firebasestorage.googleapis.com/v0/b/cnpm-c8641.appspot.com/o/files%2F%C4%90%E1%BB%8Anh%20l%C3%BD%20gi%E1%BB%9Bi%20h%E1%BA%A1n%20k%E1%BA%B9p%202.png?alt=media&token=b6af3f63-72af-43f1-88a1-7570122c577d', 1);

-- --------------------------------------------------------

--
-- Table structure for table `goodsreceived`
--

CREATE TABLE `goodsreceived` (
  `id` int(11) NOT NULL,
  `dateReceived` datetime NOT NULL,
  `companyReceived` int(11) DEFAULT NULL,
  `noteReceived` text DEFAULT NULL,
  `total_value` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `goodsreceived`
--

INSERT INTO `goodsreceived` (`id`, `dateReceived`, `companyReceived`, `noteReceived`, `total_value`) VALUES
(2, '2024-09-23 11:31:22', 2, 'Ttes 1', '72878791'),
(3, '2024-09-23 11:36:35', 2, 'Ttes 1', '72878791'),
(4, '2024-09-30 12:48:01', 2, 'Ttes 1', '72878791');

-- --------------------------------------------------------

--
-- Table structure for table `goodsreceiveddetails`
--

CREATE TABLE `goodsreceiveddetails` (
  `idReceived` int(11) NOT NULL,
  `idProduct` int(11) NOT NULL,
  `price` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `goodsreceiveddetails`
--

INSERT INTO `goodsreceiveddetails` (`idReceived`, `idProduct`, `price`, `quantity`) VALUES
(2, 1, '200000', 34),
(2, 2, '190000', 7),
(2, 3, '250000', 14),
(2, 4, '290000', 12),
(2, 5, '550000', 12),
(2, 6, '45000', 10),
(2, 7, '45000', 10),
(2, 8, '78000', 12),
(2, 9, '78000', 20),
(2, 10, '78000', 18),
(2, 11, '78000', 13),
(2, 12, '78000', 12),
(2, 13, '78000', 10),
(2, 14, '78000', 15),
(2, 15, '99000', 13),
(2, 16, '85000', 12),
(2, 17, '105000', 12),
(2, 18, '590000', 13),
(2, 19, '480000', 10),
(2, 20, '125000', 13),
(2, 21, '69000', 14),
(2, 22, '150000', 11),
(2, 23, '150000', 15),
(2, 24, '69000', 11),
(2, 25, '69000', 11),
(2, 26, '69000', 12),
(2, 27, '69000', 20),
(2, 28, '79000', 18),
(2, 29, '29000', 13),
(2, 30, '45000', 10),
(2, 31, '45000', 12),
(2, 32, '85000', 20),
(2, 33, '95000', 12),
(2, 34, '95000', 12),
(2, 35, '95000', 13),
(2, 36, '95000', 19),
(2, 37, '95000', 16),
(2, 165, '200000', 12),
(2, 166, '90000', 12),
(2, 167, '90333', 7),
(2, 168, '64455', 12),
(4, 1, '200000', 34),
(4, 2, '190000', 7),
(4, 3, '250000', 14),
(4, 4, '290000', 12),
(4, 5, '550000', 12),
(4, 6, '45000', 10),
(4, 7, '45000', 10),
(4, 8, '78000', 12),
(4, 9, '78000', 20),
(4, 10, '78000', 18),
(4, 11, '78000', 13),
(4, 12, '78000', 12),
(4, 13, '78000', 10),
(4, 14, '78000', 15),
(4, 15, '99000', 13),
(4, 16, '85000', 12),
(4, 17, '105000', 12),
(4, 18, '590000', 13),
(4, 19, '480000', 10),
(4, 20, '125000', 13),
(4, 21, '69000', 14),
(4, 22, '150000', 11),
(4, 23, '150000', 15),
(4, 24, '69000', 11),
(4, 25, '69000', 11),
(4, 26, '69000', 12),
(4, 27, '69000', 20),
(4, 28, '79000', 18),
(4, 29, '29000', 13),
(4, 30, '45000', 10),
(4, 31, '45000', 12),
(4, 32, '85000', 20),
(4, 33, '95000', 12),
(4, 34, '95000', 12),
(4, 35, '95000', 13),
(4, 36, '95000', 19),
(4, 37, '95000', 16),
(4, 165, '200000', 12),
(4, 166, '90000', 12),
(4, 167, '90333', 7),
(4, 168, '64455', 12);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL COMMENT 'id người dùng',
  `employee_id` int(11) DEFAULT NULL,
  `fullname` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `address` varchar(300) NOT NULL,
  `note` varchar(500) NOT NULL COMMENT 'Ghi chú',
  `shipFee` int(11) NOT NULL,
  `order_date` datetime NOT NULL COMMENT 'Thời điểm đặt đơn hàng',
  `total_money` decimal(18,2) NOT NULL COMMENT 'Tổng tiền đơn hàng',
  `status` int(11) NOT NULL COMMENT 'Trạng thái'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `user_id`, `employee_id`, `fullname`, `email`, `phone_number`, `address`, `note`, `shipFee`, `order_date`, `total_money`, `status`) VALUES
(48, 6, 2, 'lee  Trung', 'haochau123@gmail.com', '0357255077', 'bih thuan, Sông Xoài, Thị xã Phú Mỹ, Tỉnh Bà Rịa - Vũng Tàu', 'giao nhanh len', 35000, '2024-05-09 14:15:17', 385000.00, 2),
(49, 8, 2, 'Lê Văn Trung Lê Văn Trung', 'trungm8fordev@gmail.com', '0357255074', 'duong  quoc lo, 16, Quận Gò Vấp, Thành phố Hồ Chí Minh', 'fg', 19000, '2024-05-09 15:52:36', 123000.00, 4),
(50, 7, 1, 'Duy Khánh', 'khanhp2004@gmail.com', '0965505617', 'Lung Ngang, Tam Giang, Năm Căn, Tỉnh Cà Mau', 'giao nhanh len', 35000, '2024-04-29 23:19:17', 385000.00, 2),
(51, 7, 1, 'Duy Khánh', 'khanhp2004@gmail.com', '0965505617', 'Lung Ngang, Tam Giang, Năm Căn, Tỉnh Cà Mau', 'giao nhanh len', 35000, '2024-05-05 23:20:41', 385000.00, 3),
(52, 8, 1, 'gdsfd ahshdsjh', 'haochau123@gmail.com', '0357255074', 'dduowng so 6 thon ha lang, Đôn Phong, Huyện Bạch Thông, Tỉnh Bắc Kạn', 'asdsads', 35000, '2024-05-11 10:50:01', 540000.00, 4),
(53, 8, 1, 'Lê Văn Trung Lê Văn Trung', 'manunited.levantrung@gmail.com', '0357255074', ', An Hải, Huyện Ninh Phước, Tỉnh Ninh Thuận', 'twafsda', 35000, '2024-05-12 17:48:16', 570000.00, 5),
(54, 9, NULL, 'Lê Văn Trung Lê Văn Trung', 'levantrung14032004@gmail.com', '0357255074', 'duong so 6, Nghĩa Thành, Huyện Châu Đức, Tỉnh Bà Rịa - Vũng Tàu', '', 35000, '2024-09-11 07:58:37', 440000.00, 2),
(56, 6, 1, 'lee  Trung', 'haochau123@gmail.com', '0357255077', 'bih thuan, Sông Xoài, Thị xã Phú Mỹ, Tỉnh Bà Rịa - Vũng Tàu', 'giao nhanh len', 35000, '2024-09-19 23:42:20', 385000.00, 2),
(57, 6, 1, 'lee  Trung', 'haochau123@gmail.com', '0357255077', 'bih thuan, Sông Xoài, Thị xã Phú Mỹ, Tỉnh Bà Rịa - Vũng Tàu', 'giao nhanh len', 35000, '2024-09-19 23:42:54', 385000.00, 2),
(58, 6, 1, 'lee  Trung', 'haochau123@gmail.com', '0357255077', 'bih thuan, Sông Xoài, Thị xã Phú Mỹ, Tỉnh Bà Rịa - Vũng Tàu', 'giao nhanh len', 35000, '2024-09-19 23:44:17', 385000.00, 2),
(59, 6, 1, 'lee  Trung', 'haochau123@gmail.com', '0357255077', 'bih thuan, Sông Xoài, Thị xã Phú Mỹ, Tỉnh Bà Rịa - Vũng Tàu', 'giao nhanh len', 35000, '2024-09-19 23:45:41', 385000.00, 2),
(60, 6, 1, 'lee  Trung', 'haochau123@gmail.com', '0357255077', 'bih thuan, Sông Xoài, Thị xã Phú Mỹ, Tỉnh Bà Rịa - Vũng Tàu', 'giao nhanh len', 35000, '2024-09-19 23:46:01', 385000.00, 2),
(61, 6, 1, 'lee  Trung', 'haochau123@gmail.com', '0357255077', 'bih thuan, Sông Xoài, Thị xã Phú Mỹ, Tỉnh Bà Rịa - Vũng Tàu', 'giao nhanh len', 35000, '2024-09-19 23:47:18', 385000.00, 2),
(62, 6, 1, 'lee  Trung', 'haochau123@gmail.com', '0357255077', 'bih thuan, Sông Xoài, Thị xã Phú Mỹ, Tỉnh Bà Rịa - Vũng Tàu', 'giao nhanh len', 35000, '2024-09-19 23:48:26', 385000.00, 2),
(63, 6, 1, 'lee  Trung', 'haochau123@gmail.com', '0357255077', 'bih thuan, Sông Xoài, Thị xã Phú Mỹ, Tỉnh Bà Rịa - Vũng Tàu', 'giao nhanh len', 35000, '2024-09-19 23:48:58', 385000.00, 2),
(64, 13, NULL, 'Lê Văn Trung Lê Văn Trung', 'levantrung14032004@gmail.com', '0357255074', 'duong so 6, Nhơn Phú, Thành phố Quy Nhơn, Tỉnh Bình Định', 'nhanh me may len', 35000, '2024-10-07 21:58:53', 722250.00, 2),
(65, 13, NULL, 'Lê Văn Trung Lê Văn Trung', 'levantrung14032004@gmail.com', '0357255074', 'dduowng so 6 thon ha lang, Long Hưng, Quận Ô Môn, Thành phố Cần Thơ', '', 35000, '2024-10-07 23:06:51', 48150.00, 2);

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL COMMENT 'Khóa chính',
  `order_id` int(11) NOT NULL COMMENT 'Khóa ngoại tham chiếu đến bảng order',
  `product_id` int(11) NOT NULL COMMENT 'Khóa ngoại tham chiếu đến bảng product',
  `thumbnail` varchar(255) NOT NULL,
  `price` decimal(18,2) NOT NULL,
  `num` int(11) NOT NULL COMMENT 'Số lượng sản phẩm',
  `total_money` decimal(18,2) NOT NULL COMMENT 'price * num',
  `status` int(11) NOT NULL COMMENT 'Trạng thái'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`id`, `order_id`, `product_id`, `thumbnail`, `price`, `num`, `total_money`, `status`) VALUES
(36, 48, 7, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/56b0b4b6-f833-46d6-47e7-08ba5a4d2100/w=705', 45000.00, 3, 135000.00, 1),
(37, 48, 3, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/ef280a01-24ac-4894-843f-3ccef4fc3f00/w=705', 250000.00, 1, 250000.00, 1),
(38, 49, 9, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/5daf7980-155c-4d08-27d9-cbce007bcb00/w=705', 78000.00, 1, 78000.00, 1),
(39, 49, 6, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/bec5a347-adf6-46b7-46f2-92c5cf2f5000/w=705', 45000.00, 1, 45000.00, 1),
(40, 50, 7, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/56b0b4b6-f833-46d6-47e7-08ba5a4d2100/w=705', 45000.00, 3, 135000.00, 1),
(41, 50, 3, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/ef280a01-24ac-4894-843f-3ccef4fc3f00/w=705', 250000.00, 1, 250000.00, 1),
(42, 51, 7, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/56b0b4b6-f833-46d6-47e7-08ba5a4d2100/w=705', 45000.00, 3, 135000.00, 1),
(43, 51, 3, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/ef280a01-24ac-4894-843f-3ccef4fc3f00/w=705', 250000.00, 1, 250000.00, 1),
(44, 52, 3, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/ef280a01-24ac-4894-843f-3ccef4fc3f00/w=705', 250000.00, 1, 250000.00, 1),
(45, 52, 4, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/bf1502ce-cede-433d-e678-82bdfb352500/w=705', 290000.00, 1, 290000.00, 1),
(46, 53, 2, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/983fdd36-45d2-4abc-831c-2641efcb7d00/w=705', 190000.00, 3, 190000.00, 1),
(47, 54, 2, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/983fdd36-45d2-4abc-831c-2641efcb7d00/w=705', 190000.00, 1, 190000.00, 1),
(48, 54, 3, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/ef280a01-24ac-4894-843f-3ccef4fc3f00/w=705', 250000.00, 1, 250000.00, 1),
(49, 63, 7, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/56b0b4b6-f833-46d6-47e7-08ba5a4d2100/w=705', 45000.00, 3, 135000.00, 1),
(50, 63, 3, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/ef280a01-24ac-4894-843f-3ccef4fc3f00/w=705', 250000.00, 1, 250000.00, 1),
(51, 64, 5, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/a230721c-e62a-41df-65de-2a5822ddec00/w=705', 588500.00, 1, 588500.00, 1),
(52, 64, 20, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/6d9f21c3-6a6f-4084-c58c-527ae106c400/w=705', 133750.00, 1, 133750.00, 1),
(53, 65, 6, 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/bec5a347-adf6-46b7-46f2-92c5cf2f5000/w=705', 48150.00, 1, 48150.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `entity` varchar(50) DEFAULT NULL,
  `action` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `entity`, `action`) VALUES
(1, 'products', 'create'),
(2, 'products', 'update'),
(3, 'products', 'delete'),
(4, 'products', 'view'),
(5, 'users', 'create'),
(6, 'users', 'update'),
(7, 'users', 'delete'),
(8, 'users', 'view'),
(9, 'orders', 'create'),
(10, 'orders', 'update'),
(11, 'orders', 'delete'),
(12, 'orders', 'view'),
(13, 'employees', 'create'),
(14, 'employees', 'update'),
(15, 'employees', 'delete'),
(16, 'employees', 'view'),
(17, 'authors', 'create'),
(18, 'authors', 'update'),
(19, 'authors', 'delete'),
(20, 'authors', 'view'),
(21, 'goods', 'create'),
(22, 'goods', 'update'),
(23, 'goods', 'delete'),
(24, 'goods', 'view'),
(25, 'dashboard', 'view');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL COMMENT 'Khóa chính',
  `author_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL COMMENT 'Tiêu đề sản phẩm\r\n',
  `thumbnail` varchar(500) NOT NULL COMMENT 'Hình ảnh thu nhỏ',
  `description` longtext NOT NULL COMMENT 'Mô tả',
  `introduce` text DEFAULT NULL,
  `information` varchar(300) DEFAULT NULL,
  `weight` decimal(18,2) DEFAULT NULL,
  `created_at` date NOT NULL COMMENT 'Ngày tạo',
  `update_at` date NOT NULL COMMENT 'Ngày cập nhật',
  `status` int(11) NOT NULL COMMENT 'Trạng thái',
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(18,2) DEFAULT NULL,
  `id_company` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `author_id`, `title`, `thumbnail`, `description`, `introduce`, `information`, `weight`, `created_at`, `update_at`, `status`, `quantity`, `price`, `id_company`) VALUES
(1, NULL, '69 Sắc Thái – Giải Phẫu Học Nghệ Thuật', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/35919ba9-2db2-4cdf-6fa8-871469353800/w=705', 'Cuốn sách này ra đời giúp cho tất cả chúng ta có thể vẽ được đúng cơ thể người. Sự ra đời của cuốn sách 100% tiếng Việt này cũng phá vỡ hoàn toàn rào cản ngôn ngữ khiến cho bất kỳ ai cũng có thể đọc được mà không cần phải biết ngoại ngữ.', 'Cuốn sách thông qua 69 nhân vật khác nhau giúp bạn đọc từ các lĩnh vực, ngành nghề như: sinh viên mỹ thuật, hoạ sĩ truyện tranh, hoạt hình, minh hoạ, chuyển động, game v.v… hiểu và vẽ đúng cơ thể người qua cách trình bày dân dã, dễ hiểu mà lại rất khoa học.\r\n\r\nCuốn sách này ra đời giúp cho tất cả chúng ta có thể vẽ được đúng cơ thể người. Sự ra đời của cuốn sách 100% tiếng Việt này cũng phá vỡ hoàn toàn rào cản ngôn ngữ khiến cho bất kỳ ai cũng có thể đọc được mà không cần phải biết ngoại ngữ.', 'Khổ sách: 21 x 29,7\r\nSố trang: 144 trang', 0.50, '2024-04-01', '2024-04-16', 0, 19, 214000.00, NULL),
(2, NULL, 'Hành Trình Tarot – Cuộc Phiêu Lưu Của Cá Mập Voi', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/983fdd36-45d2-4abc-831c-2641efcb7d00/w=705', 'Dựa trên cấu trúc của Tarot, thông qua 22 bài học khác nhau, cuốn sách sẽ hướng dẫn cho người đọc vượt qua 22 vấn đề của đời sống thường nhật. Qua cuốn sách, độc giả có cơ hội hoà mình vào nhân vật chính, một chú Cá Mập Voi để lần lượt trải qua những kinh nghiệm siêu việt bằng trí tưởng tượng để đạt được những chiêm nghiệm sâu sắc, cho dù dưới lớp áo của từ ngữ và hình ảnh dành cho thiếu nhi.', 'Quyển sách Hành Trình Tarot – Cuộc Phiêu Lưu Của Cá Mập Voi là tác phẩm thứ 11 của Nhà văn Đặng Thiên Phong. Quyển sách gồm các chương tương ứng với 23 lá bài ẩn chính của một cỗ bài Tarot, đồng thời là các câu chuyện, lời khuyên và bài học để các bạn thanh thiếu nhi có thể dễ dàng đút kết.\r\n\r\nQuyển sách được trình bày dưới dạng song ngữ, tranh minh họa do Họa sĩ Thu Hằng đảm nhiệm vẽ và ComiCola phát hành, mong sẽ nhận được sự quan tâm và tìm đọc của tất cả độc giả.', '01 cuốn sách “Hành Trình Tarot – Cuộc Phiêu Lưu Của Cá Mập Voi” được in màu toàn bộ 104 trang.\r\nTặng kèm với 01 bộ bài tarot 23 lá, kích thước 7x12cm.', 0.50, '2024-04-01', '2024-04-17', 1, 6, 203300.00, NULL),
(3, NULL, 'Truyện Kiều và Tarot', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/ef280a01-24ac-4894-843f-3ccef4fc3f00/w=705', 'Cỗ bài Tarot và tác phẩm truyện thơ Truyện Kiều dù có cách thể hiện khác nhau, cùng nhắm đến kể chuyện về nhân sinh và con người.\r\nSách “Truyện Kiều và Tarot” là những đối chiếu giữa 78 tình huống, sự kiện đời người của tarot với những cảnh tình của cuộc đời nàng Thúy Kiều trong mối quan hệ với những người tình của cô', 'Cỗ bài Tarot và tác phẩm truyện thơ Truyện Kiều dù có cách thể hiện khác nhau, cùng nhắm đến kể chuyện về nhân sinh và con người.\r\n\r\nSách “Truyện Kiều và Tarot” là những đối chiếu giữa 78 tình huống, sự kiện đời người của tarot với những cảnh tình của cuộc đời nàng Thúy Kiều trong mối quan hệ với những người tình của cô như:\r\n\r\n22 lá Ẩn Chính: Những sự kiện chính mà nàng Kiều phải trải qua trong 15 năm đoạn trường.\r\n10 lá Chén: Mối tình đầu tiên, thơ ngây và đầy cảm xúc của Kiều với Kim Trọng\r\n10 lá Tiền: Mối tình đầy vật chất và những tính toán của Kiều với Thúc Sinh và Hoạn Thư\r\n10 lá Kiếm: Mối tình đầy g.ươm đau và khổ ải của Kiều với Từ Hải\r\n10 lá Gậy: Sự trưởng thành và giác ngộ của Kiều cùng sư Giác Duyên\r\n16 lá Hoàng Gia: 16 nhân vật tiêu biểu của Truyện Kiều tướng ứng với 16 tính cách thường thấy của con người.', 'Năm xuất bản: 2022\r\nSố trang: 335\r\nNhà xuất bản: Nhà Xuất bản Đồng Nai\r\nCông ty phát hành: Comicola', 0.50, '2024-04-01', '2024-04-18', 0, 12, 267500.00, NULL),
(4, NULL, 'Cuốn sách Dệt Nên Triều Đại', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/bf1502ce-cede-433d-e678-82bdfb352500/w=705', 'Những bộ trang phục từ hàng trăm năm trước, tưởng chỉ có thể nhìn thấy qua tranh ảnh hoặc tại bảo tàng thì nay đã được tái hiện sinh động dưới bàn tay của những người trẻ.', 'Tranh phác thảo được thực hiện bởi hoạ sĩ Nguyễn Hoàng Dương, tác giả truyện tranh cổ phong Về nam gió thổi, giải nhất cuộc thi sáng tác truyện tranh Thế giới ước mơ mùa thứ 8. Tranh minh hoạ được thực hiện bởi hoạ sĩ Đăng Thiên, sáng lập trang Nam văn hội quán giới thiệu về lịch sử, văn hoá Việt Nam.\r\n\r\nẢnh chụp trang phục phỏng dựng được thực hiện bởi nhóm nhiếp ảnh gia Steve Huỳnh, Nguyễn Vũ Kỳ Phong, stylist Boongbi, là những nghệ sĩ từng có cơ hội hợp tác với các tạp chí ảnh nổi tiếng Thế giới như Vogue, Promo, BeauNu…\r\n\r\nTrang phục phỏng dựng do nghệ nhân áo dài cổ Trần Lê Trung Hiếu thực hiện theo bản vẽ kỹ thuật được cung cấp và nghiên cứu lỹ lưỡng bởi anh Nguyễn Ngọc Phương Đông, admin diễn đàn Đại Việt Cổ Phong.', 'Số trang: 224 trang\r\nQuy cách: In 4 màu trên giấy Couché. Bìa cán mờ có phủ UV\r\nKích thước: 25 cm x 25 cm\r\nNăm xuất bản :2020\r\nNhà xuất bản: Dân Trí', 0.50, '2024-04-01', '2024-04-10', 0, 12, 310300.00, NULL),
(5, NULL, 'Lôi Động, Tinh Phi – Khảo cứu về súng đạn người Việt', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/a230721c-e62a-41df-65de-2a5822ddec00/w=705', 'Lôi Động Tinh Phi là một cuốn sách song ngữ (Anh – Việt) khảo cứu về lịch sử súng đạn của Việt Nam, tập trung vào việc khám phá những công nghệ và chiến thuật độc đáo của người Việt trong việc sử dụng súng đạn để dựng nước và giữ nước. Đặc biệt, cuốn sách cung cấp những thông tin chi tiết về các loại súng đạn được sử dụng trong lịch sử của Việt Nam, Bằng cách đó, người đọc có thể hiểu rõ hơn về tầm quan trọng của súng đạn trong việc bảo vệ đất nước và xây dựng quốc gia.', 'Người Việt biết sử dụng súng đạn trước Châu Âu? Hiệp Súng là gì? Thần Cơ pháo không phải một loại đại bác? Đàng Ngoài mới là xuất xứ của Hỏa Hổ? Đại Việt có thể liệt vào hàng “tiểu đế quốc thuốc súng?”\r\n\r\nLôi Động, Tinh Phi là một cuốn sách khảo cứu về lịch sử súng đạn của Việt Nam, tập trung vào việc khám phá những công nghệ và chiến thuật độc đáo của người Việt trong việc sử dụng súng đạn để dựng nước và giữ nước.\r\n\r\nĐặc biệt, cuốn sách cung cấp những thông tin chi tiết về các loại súng đạn được sử dụng trong lịch sử của Việt Nam, Bằng cách đó, người đọc có thể hiểu rõ hơn về tầm quan trọng của súng đạn trong việc bảo vệ đất nước và xây dựng quốc gia.\r\n\r\nBên cạnh những nguồn tư liệu chưa từng được khai thác đến từ tác giả Nguyễn Ngọc Phương Đông, điểm nhấn của cuốn sách là hàng chục bức tranh khổ lớn do họa sĩ  Caoviet Nguyen (Kaovjets Ngujens) minh họa, dựa trên các tư liệu lịch sử và hình ảnh hiện vật thật.\r\n\r\nSách dày 344 trang, in màu toàn bộ trên giấy chất lượng cao, nội dung song ngữ Anh – Việt. Phiên bản bìa cứng chỉ phát hành duy nhất 1000 bản, không tái bản, khổ 23 x 24.5cm, có chữ ký tác giả.\r\n\r\nTựa đề “Lôi Động, Tinh Phi” của sách lấy cảm hứng từ dòng mô tả rất sống động của nhà văn Nguyễn Khoa Chiêm trong tác phẩm “Việt Nam Khai Quốc Chí Truyện” về một trận chiến thế kỷ XVII: “súng như lôi động, đạn nhược tinh phi” (dịch nghĩa: “súng như sấm động, đạn tựa sao bay.”)', 'Phiên bản bìa cứng chỉ phát hành duy nhất 1000 bản, không tái bản, có áo bìa.\r\nSách song ngữ Việt – Anh.\r\nSách dày 344 trang, in màu toàn bộ trên giấy chất lượng cao.\r\nKích thước 23 x 24,5cm.\r\nSách có chữ ký tác giả', 0.50, '2024-04-01', '2024-04-10', 1, 11, 588500.00, NULL),
(6, 5, '50 Sắc Màu Tập 1', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/bec5a347-adf6-46b7-46f2-92c5cf2f5000/w=705', '50 sắc màu kể về một thiếu nữ tuổi trăng tròn với sở thích đọc truyện ngôn tình vô cùng tao nhã, mục tiêu của nàng là cứ mỗi buổi tối trước khi đi ngủ sẽ đọc xong một tựa truyện. Thế nhưng vào một đêm nọ nàng vô tình bị hút vào thế giới trong truyện và bất ngờ sắm luôn vai nữ chính mang tên Kim Ngân… Ở thế giới mới lạ lẫm không có trong tay một cái gì ngoài bộ ngực khủng và mối quan hệ với anh tổng giám đốc đẹp trai Định Phong, liệu câu chuyện ngôn tình mà nàng đang đọc dở dang sẽ xoay chuyển đến đâu..?! ', '50 Sắc Màu là bộ truyện tranh dành cho thiếu nữ đầu tiên tại Việt Nam. Tác phẩm được viết bởi nữ họa sĩ trẻ Dương Thạch Thảo – còn được biết đến trên cộng đồng mạng với bút danh Nie.\r\n\r\nTại Nhật Bản, thể loại Shoujo – truyện tranh dành cho thiếu nữ rất phổ biến và được nhiều người yêu thích. Tuy nhiên, trên thị trường truyện tranh Việt vẫn chưa hề có một tác phẩm nào đặc biệt dành riêng cho các độc giả nữ. 50 Sắc Màu chính là tác phẩm đi tiên phong trong thể loại này. 50 sắc màu kể về một thiếu nữ tuổi trăng tròn với sở thích đọc truyện ngôn tình vô cùng tao nhã, mục tiêu của nàng là cứ mỗi buổi tối trước khi đi ngủ sẽ đọc xong một tựa truyện. Thế nhưng vào một đêm nọ nàng vô tình bị hút vào thế giới trong truyện và bất ngờ sắm luôn vai nữ chính mang tên Kim Ngân… Ở thế giới mới lạ lẫm không có trong tay một cái gì ngoài bộ ngực khủng và mối quan hệ với anh tổng giám đốc đẹp trai Định Phong, liệu câu chuyện ngôn tình mà nàng đang đọc dở dang sẽ xoay chuyển đến đâu..?!\r\n\r\nNie gây ấn tượng bằng nét vẽ được trau chuốt, tạo hình nhân vật bắt mắt, thu hút. Các tác phẩm của Nie đều hướng tới các độc giả nữ nên các câu chuyện được kể đều mang màu sắc tình yêu ngọt ngào, lãng mạn,… Chính vì vậy, truyện của Nie đều nhận được nhiều quan tâm và phản hồi tích cực. Có thể nói, 50 Sắc Màu được xem như một cuốn ngôn tình được kể bằng tranh.\r\n\r\nTác phẩm hứa hẹn sẽ đem lại nhiều điều bất ngờ và mới mẻ, không đơn thuần như những oneshot trước của Nie. Truyện chắc chắn sẽ không làm thất vọng những ai đã dành tình cảm cho thể loại truyện tranh thiếu nữ và hấp dẫn những ai muốn trải nghiệm thể loại mới này.', '500 bản có chữ ký có tác giả và họa sĩ minh họa.\r\nKhổ sách: 14.5 x 20.5.\r\nSố trang: 228.\r\nSố lượng in: 2000 cuốn.\r\nBìa: Ivory300 in màu 4/4, gấp cánh 8cm.\r\nRuột: giấy ốp 80. 24 trang màu 4/4.', 0.50, '2024-04-01', '2024-04-10', 1, 9, 48150.00, NULL),
(7, 5, '50 Sắc Màu Tập 2', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/56b0b4b6-f833-46d6-47e7-08ba5a4d2100/w=705', '50 sắc màu kể về một thiếu nữ tuổi trăng tròn với sở thích đọc truyện ngôn tình vô cùng tao nhã, mục tiêu của nàng là cứ mỗi buổi tối trước khi đi ngủ sẽ đọc xong một tựa truyện. Thế nhưng vào một đêm nọ nàng vô tình bị hút vào thế giới trong truyện và bất ngờ sắm luôn vai nữ chính mang tên Kim Ngân… Ở thế giới mới lạ lẫm không có trong tay một cái gì ngoài bộ ngực khủng và mối quan hệ với anh tổng giám đốc đẹp trai Định Phong, liệu câu chuyện ngôn tình mà nàng đang đọc dở dang sẽ xoay chuyển đến đâu..?! ', '50 Sắc Màu là bộ truyện tranh dành cho thiếu nữ đầu tiên tại Việt Nam. Tác phẩm được viết bởi nữ họa sĩ trẻ Dương Thạch Thảo – còn được biết đến trên cộng đồng mạng với bút danh Nie.\r\n\r\nTại Nhật Bản, thể loại Shoujo – truyện tranh dành cho thiếu nữ rất phổ biến và được nhiều người yêu thích. Tuy nhiên, trên thị trường truyện tranh Việt vẫn chưa hề có một tác phẩm nào đặc biệt dành riêng cho các độc giả nữ. 50 Sắc Màu chính là tác phẩm đi tiên phong trong thể loại này. 50 sắc màu kể về một thiếu nữ tuổi trăng tròn với sở thích đọc truyện ngôn tình vô cùng tao nhã, mục tiêu của nàng là cứ mỗi buổi tối trước khi đi ngủ sẽ đọc xong một tựa truyện. Thế nhưng vào một đêm nọ nàng vô tình bị hút vào thế giới trong truyện và bất ngờ sắm luôn vai nữ chính mang tên Kim Ngân… Ở thế giới mới lạ lẫm không có trong tay một cái gì ngoài bộ ngực khủng và mối quan hệ với anh tổng giám đốc đẹp trai Định Phong, liệu câu chuyện ngôn tình mà nàng đang đọc dở dang sẽ xoay chuyển đến đâu..?!\r\n\r\nNie gây ấn tượng bằng nét vẽ được trau chuốt, tạo hình nhân vật bắt mắt, thu hút. Các tác phẩm của Nie đều hướng tới các độc giả nữ nên các câu chuyện được kể đều mang màu sắc tình yêu ngọt ngào, lãng mạn,… Chính vì vậy, truyện của Nie đều nhận được nhiều quan tâm và phản hồi tích cực. Có thể nói, 50 Sắc Màu được xem như một cuốn ngôn tình được kể bằng tranh.\r\n\r\nTác phẩm hứa hẹn sẽ đem lại nhiều điều bất ngờ và mới mẻ, không đơn thuần như những oneshot trước của Nie. Truyện chắc chắn sẽ không làm thất vọng những ai đã dành tình cảm cho thể loại truyện tranh thiếu nữ và hấp dẫn những ai muốn trải nghiệm thể loại mới này.', '500 bản có chữ ký có tác giả và họa sĩ minh họa.\r\nKhổ sách: 14.5 x 20.5.\r\nSố trang: 228.\r\nSố lượng in: 2000 cuốn.\r\nBìa: Ivory300 in màu 4/4, gấp cánh 8cm.\r\nRuột: giấy ốp 80. 24 trang màu 4/4.', 0.50, '2024-04-01', '2024-04-10', 1, 7, 48150.00, NULL),
(8, 3, 'Bad Luck Tập 1', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/878c7553-6989-4a79-1036-353847ab6500/w=705', 'Là bộ truyện tranh được đọc nhiều nhất trên Comicola, một trong những tác phẩm truyện tranh Việt Nam có lượng fan đông đảo và hùng hậu bậc nhất hiện nay.', 'Là bộ truyện tranh được đọc nhiều nhất trên Comicola, một trong những tác phẩm truyện tranh Việt Nam có lượng fan đông đảo và hùng hậu bậc nhất hiện nay.\r\n\r\nBad Luck ban đầu được dự tính sẽ phát hành online 100%. Tuy nhiên, chúng tôi đã có những chỉnh sửa, nâng cấp nhất định dành cho Bad Luck, và nhận được sự ủng hộ nhiệt tình từ phía các anh chị bên phía nhà xuất bản để có thể ra lò cuốn sách.\r\n\r\nBad Luck tập 1 bao gồm 13 chương của Bad Luck (Từ chương 01 – chương 13), được chỉnh sửa, nâng cấp. Cuốn sách dày 244 trang, được in trên khổ 14.5 x 20.5, bìa gập có tay gấp, giấy chất lượng tốt.', 'Gồm 13 chương của Bad Luck, được chỉnh sửa và nâng cấp.\r\nCuốn sách dày 244 trang.\r\nKích thước: 14.5 x 20.5 cm.', 0.50, '2024-04-01', '2024-04-10', 1, 12, 83460.00, NULL),
(9, 3, 'Bad Luck Tập 2', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/5daf7980-155c-4d08-27d9-cbce007bcb00/w=705', 'Là bộ truyện tranh được đọc nhiều nhất trên Comicola, một trong những tác phẩm truyện tranh Việt Nam có lượng fan đông đảo và hùng hậu bậc nhất hiện nay.', 'Là bộ truyện tranh được đọc nhiều nhất trên Comicola, một trong những tác phẩm truyện tranh Việt Nam có lượng fan đông đảo và hùng hậu bậc nhất hiện nay.\r\n\r\nBad Luck ban đầu được dự tính sẽ phát hành online 100%. Tuy nhiên, chúng tôi đã có những chỉnh sửa, nâng cấp nhất định dành cho Bad Luck, và nhận được sự ủng hộ nhiệt tình từ phía các anh chị bên phía nhà xuất bản để có thể ra lò cuốn sách.\r\n\r\nBad Luck tập 2 bao gồm 12 chương của Bad Luck (Từ chương 14 – chương 26), được chỉnh sửa, nâng cấp. Cuốn sách dày 264 trang, được in trên khổ 14.5 x 20.5, bìa gập có tay gấp, giấy chất lượng tốt.', 'Gồm 12 chương của Bad Luck, được chỉnh sửa và nâng cấp.\r\nCuốn sách dày 264 trang.\r\nKích thước: 14.5 x 20.5 cm.', 0.50, '2024-04-01', '2024-04-10', 1, 20, 83460.00, NULL),
(10, 3, 'Bad Luck Tập 3', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/f9e27daa-40cf-499a-a246-b166f5634100/w=705', 'Là bộ truyện tranh được đọc nhiều nhất trên Comicola, một trong những tác phẩm truyện tranh Việt Nam có lượng fan đông đảo và hùng hậu bậc nhất hiện nay.', 'Là bộ truyện tranh được đọc nhiều nhất trên Comicola, một trong những tác phẩm truyện tranh Việt Nam có lượng fan đông đảo và hùng hậu bậc nhất hiện nay.\r\n\r\nBad Luck ban đầu được dự tính sẽ phát hành online 100%. Tuy nhiên, chúng tôi đã có những chỉnh sửa, nâng cấp nhất định dành cho Bad Luck, và nhận được sự ủng hộ nhiệt tình từ phía các anh chị bên phía nhà xuất bản để có thể ra lò cuốn sách.\r\n\r\nBad Luck tập 3 bao gồm 10 chương của Bad Luck (Từ chương 27 – chương 36), được chỉnh sửa, nâng cấp. Cuốn sách dày 214 trang, được in trên khổ 14.5 x 20.5, bìa gập có tay gấp, giấy chất lượng tốt.', 'Gồm 10 chương của Bad Luck, được chỉnh sửa và nâng cấp.\r\nCuốn sách dày 214 trang.\r\nKích thước: 14.5 x 20.5 cm.', 0.50, '2024-04-01', '2024-04-10', 1, 18, 83460.00, NULL),
(11, 3, 'Bad Luck Tập 4', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/6e2ea6c4-4399-4765-b466-61522587e900/w=705', 'Là bộ truyện tranh được đọc nhiều nhất trên Comicola, một trong những tác phẩm truyện tranh Việt Nam có lượng fan đông đảo và hùng hậu bậc nhất hiện nay.', 'Là bộ truyện tranh được đọc nhiều nhất trên Comicola, một trong những tác phẩm truyện tranh Việt Nam có lượng fan đông đảo và hùng hậu bậc nhất hiện nay.\r\n\r\nBad Luck ban đầu được dự tính sẽ phát hành online 100%. Tuy nhiên, chúng tôi đã có những chỉnh sửa, nâng cấp nhất định dành cho Bad Luck, và nhận được sự ủng hộ nhiệt tình từ phía các anh chị bên phía nhà xuất bản để có thể ra lò cuốn sách.\r\n\r\nBad Luck tập 4 bao gồm 12 chương của Bad Luck (Từ chương 37 – chương 48), được chỉnh sửa, nâng cấp. Cuốn sách dày 248 trang, được in trên khổ 14.5 x 20.5, bìa gập có tay gấp, giấy chất lượng tốt.', 'Gồm 12 chương của Bad Luck, được chỉnh sửa và nâng cấp.\r\nCuốn sách dày 248 trang.\r\nKích thước: 14.5 x 20.5 cm.', 0.50, '2024-04-01', '2024-04-10', 1, 13, 83460.00, NULL),
(12, 3, 'Bad Luck Tập 5', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/80f4eb54-1321-4f3a-c152-1b11c8017f00/w=705', 'Là bộ truyện tranh được đọc nhiều nhất trên Comicola, một trong những tác phẩm truyện tranh Việt Nam có lượng fan đông đảo và hùng hậu bậc nhất hiện nay.', 'Là bộ truyện tranh được đọc nhiều nhất trên Comicola, một trong những tác phẩm truyện tranh Việt Nam có lượng fan đông đảo và hùng hậu bậc nhất hiện nay.\r\n\r\nBad Luck ban đầu được dự tính sẽ phát hành online 100%. Tuy nhiên, chúng tôi đã có những chỉnh sửa, nâng cấp nhất định dành cho Bad Luck, và nhận được sự ủng hộ nhiệt tình từ phía các anh chị bên phía nhà xuất bản để có thể ra lò cuốn sách.\r\n\r\nBad Luck tập 5 bao gồm 12 chương của Bad Luck (Từ chương 49 – chương 60), được chỉnh sửa, nâng cấp. Cuốn sách dày 248 trang, được in trên khổ 14.5 x 20.5, bìa gập có tay gấp, giấy chất lượng tốt.', 'Gồm 12 chương của Bad Luck, được chỉnh sửa và nâng cấp.\r\nCuốn sách dày 248 trang.\r\nKích thước: 14.5 x 20.5 cm.\r\n01 postcard tặng kèm hình Minh và Hoàng (chỉ dành cho các bạn đặt hàng trước khi sách phát hành)', 0.50, '2024-04-01', '2024-04-10', 1, 12, 83460.00, NULL),
(13, 3, 'Bad Luck Tập 6', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/85a47ea9-ec69-4447-38b1-32941e7c3a00/w=705', 'Để tiêu diệt An, bà Linh đã dùng đến vũ khí bí mật cuối cùng để kết thúc cuộc chiến. Thế nhưng bà ta lại vô tình mang đến một thứ còn kinh khủng hơn. Liệu An có giữ được tính mạng trước trận công kích của bà Linh hay thế cờ sẽ thay đổi trước những tình tiết mới?', 'Để tiêu diệt An, bà Linh đã dùng đến vũ khí bí mật cuối cùng để kết thúc cuộc chiến. Thế nhưng bà ta lại vô tình mang đến một thứ còn kinh khủng hơn. Liệu An có giữ được tính mạng trước trận công kích của bà Linh hay thế cờ sẽ thay đổi trước những tình tiết mới?\r\n\r\nLà bộ truyện tranh được đọc nhiều nhất trên Comicola, một trong những tác phẩm truyện tranh Việt Nam có lượng fan đông đảo và hùng hậu bậc nhất hiện nay.\r\n\r\nBad Luck ban đầu được dự tính sẽ phát hành online 100%. Tuy nhiên, chúng tôi đã có những chỉnh sửa, nâng cấp nhất định dành cho Bad Luck, và nhận được sự ủng hộ nhiệt tình từ phía các anh chị bên phía nhà xuất bản để có thể ra lò cuốn sách.\r\n\r\nBad Luck tập 6 bao gồm 10 chương của Bad Luck (Từ chương 61 – chương 70), được chỉnh sửa, nâng cấp. Cuốn sách dày 240 trang, được in trên khổ 14.5 x 20.5, bìa gập có tay gấp, giấy chất lượng tốt.', 'Gồm 10 chương của Bad Luck, được chỉnh sửa và nâng cấp.\r\nCuốn sách dày 240 trang.\r\nKích thước: 14.5 x 20.5 cm.', 0.50, '2024-04-01', '2024-04-10', 1, 10, 83460.00, NULL),
(14, 3, 'Bad Luck Tập 7', 'https://shop.comicola.com/wp-content/uploads/2024/03/BL07_NEN-XAM_7.png', 'Sau trận chiến trên tàu, quá khứ của gia tộc nguyền rủa dần hé lộ. Hóa ra đằng sau tất cả những sự tồn tại vô lý trong thế giới này đều có một lý do. Cái kết của câu chuyện đang đến gần mà không ai có thể ngờ được', 'Sau trận chiến trên tàu, quá khứ của gia tộc nguyền rủa dần hé lộ. Hóa ra đằng sau tất cả những sự tồn tại vô lý trong thế giới này đều có một lý do. Cái kết của câu chuyện đang đến gần mà không ai có thể ngờ được.\r\n\r\nLà bộ truyện tranh được đọc nhiều nhất trên Comicola, một trong những tác phẩm truyện tranh Việt Nam có lượng fan đông đảo và hùng hậu bậc nhất hiện nay.\r\n\r\nBad Luck ban đầu được dự tính sẽ phát hành online 100%. Tuy nhiên, chúng tôi đã có những chỉnh sửa, nâng cấp nhất định dành cho Bad Luck, và nhận được sự ủng hộ nhiệt tình từ phía các anh chị bên phía nhà xuất bản để có thể ra lò cuốn sách.\r\n\r\nBad Luck tập 7 bao gồm 12 chương của Bad Luck (Từ chương 71 – chương 81), được chỉnh sửa, nâng cấp. Cuốn sách được in trên khổ 14.5 x 20.5, bìa gập có tay gấp, giấy chất lượng tốt.', '01 cuốn truyện “Bad Luck” tập 7 gồm 12 chương của Bad Luck, được chỉnh sửa và nâng cấp, có kích thước 14.5 x 20.5 cm.\r\n01 postcard.', 0.50, '2024-04-01', '2024-04-10', 1, 15, 83460.00, NULL),
(15, 2, 'Địa Ngục Môn', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/092d76d1-134d-4629-9316-389068a43200/w=705', 'Bộ Địa Ngục Môn của Can Tiểu Hy (tên thật là Phan Cao Hà My), do NXB Mỹ thuật ấn hành, vừa đoạt giải Bạc cuộc thi truyện tranh quốc tế International Manga Award lần thứ 10 tại Nhật Bản… Đây là một trong những giải thưởng truyện tranh quốc tế uy tín, ra đời từ năm 2007 và được Bộ Ngoại giao Nhật Bản trao hằng năm từ việc lựa chọn hàng trăm tác phẩm truyện tranh khắp nơi trên thế giới gửi về.', 'Địa Ngục Môn là một tác phẩm truyện tranh của tác giả Can Tiểu Hy. Ngay khi ra mắt cộng đồng, tác phẩm đã nhận được sự đón nhận nồng nhiệt của những người yêu thích truyện tranh Việt Nam\r\n\r\nTháng 12/2016, vượt qua gần 300 tác phẩm truyện tranh khác trên toàn thế giới, tác phẩm “Địa Ngục Môn” đã vinh dự nhận giải Bạc, cuộc thi truyện tranh International Manga Award do Bộ ngoại giao Nhật Bản tổ chức.', 'Kích thước: 14.5 cm x 20.5 cm.\r\nSố trang: 165 trang.\r\nGiấy xốp Phần Lan 70gms.\r\nPhiên bản Địa Ngục Môn bán trên Comicola tặng kèm 01 bookmark độc quyền.', 0.50, '2024-04-01', '2024-04-10', 1, 13, 105930.00, NULL),
(16, NULL, 'Quan Trọng Là Phải Đẹp Trai – phiên bản 2018', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/a329e809-ea00-42b3-f40f-8cbca961b400/w=705', 'Sách “Quan trọng là phải đẹp trai” phiên bản 2018 được bán trên Comicola bao gồm:\r\n\r\nMột cuốn truyện tranh “Quan Trọng Là Phải Đẹp Trai” có áo bìa màu vàng\r\nMột thẻ hội viên đẹp trai', 'Quan Trọng Là Phải Đẹp Trai cho thấy một góc nhìn vô cùng hài hước của Thăng Fly. Và theo tôi, đó là sự độc đáo mang tính tích cực. Khi gặp khó khăn trong cuộc sống, khi trục trặc trong chuyện tình cảm, khi công việc không suôn sẻ , nếu là một người chúng ta sẽ tìm lý do gì đó, một ai đó để đổ lỗi, để giải tỏa. Nhưng đối với Thăng, cách giải thích của anh chỉ: “Đơn giản… vì bạn không đẹp trai!”. Một lý do khiến người đọc không biết làm gì khác ngoài bật cười.\r\n\r\nCuốn sách này tập hợp những câu chuyện tưởng chừng như vô thưởng vô phạt, những kỷ niệm tếu táo thời sinh viên, những trò đùa nhắng nhít, những mối tình e ngại không dám nói… mà bạn chắc chắn sẽ cảm thấy bản thân mình trong đó.”', 'Một cuốn truyện tranh “Quan Trọng Là Phải Đẹp Trai” có áo bìa màu vàng\r\nMột thẻ hội viên đẹp trai', 0.50, '2024-04-01', '2024-04-10', 1, 12, 90950.00, NULL),
(17, 10, 'Bẩm thầy Tường, có thầy Vũ đến tìm! – Tập 1', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/ad9ef303-b9ec-47dd-4170-41f59211fa00/w=705', 'Tháng 12/2022, “Bẩm Thầy Tường, Có Thầy Vũ Đến Tìm!” của tác giả Hoàng Tường Vy, do Comicola phát hành vinh dự nhận giải Đồng của cuộc thi International Manga Award lần thứ 16. Đây là tác phẩm Việt Nam đầu tiên lọt vào danh sách nhận giải kể từ năm 2017.', 'Câu chuyện hàng ngày về một anh thầy đồ và một anh thầy lang.\r\n\r\nKhông ồn ào, huyên náo, như một áng văn xuôi nhẹ nhàng, với bối cảnh làng quê Việt Nam ngày xưa cũ, đây chỉ là những chuyện tình tang nho nhỏ, linh tinh vụn vặt của hai anh và mọi người xung quanh.\r\n\r\nChương đầu tiên của cuốn sách “Bẩm thầy Tường, có thầy Vũ đến tìm!” được tác giả đăng lần đầu tiên trên fanpage “Hôm nay Vuy vẽ” vào tháng 4/2020. Trước sự ngỡ ngàng của chính tác giả Hoàng Tường Vy, chỉ trong một thời gian ngắn, chương truyện đó đã thu hút sự chú ý và yêu mến của hàng ngàn độc giả.\r\n\r\nTháng 12/2022, “Bẩm Thầy Tường, Có Thầy Vũ Đến Tìm!” của tác giả Hoàng Tường Vy, do Comicola phát hành vinh dự nhận giải Đồng của cuộc thi International Manga Award lần thứ 16. Đây là tác phẩm Việt Nam đầu tiên lọt vào danh sách nhận giải kể từ năm 2017.\r\n\r\nInternational Manga Award là một trong những giải thưởng truyện tranh quốc tế uy tín, ra đời từ năm 2007 và được Bộ Ngoại giao Nhật Bản trao hằng năm từ việc lựa chọn hàng trăm tác phẩm truyện tranh khắp nơi trên thế giới gửi về.', '01 sách “Bẩm thầy Tường, có thầy Vũ đến tìm!” – Tập 1 tái bản với bìa áo mới.\r\nTặng kèm 01 postcard được vẽ mới dành riêng cho phiên bản 2023.\r\nTặng kèm 01 bookmark ngẫu nhiên và 01 postcard ngẫu nhiên hình Duy Tường  – Yên Vũ.', 0.50, '2024-04-01', '2024-04-10', 1, 12, 112350.00, NULL),
(18, 10, 'Bẩm thầy Tường, có thầy Vũ đến tìm! – Tập 2', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/33322b41-a0b3-4ce0-2995-1df19abd1100/w=705', 'Câu chuyện hàng ngày về một anh thầy đồ và một anh thầy lang. Không ồn ào, huyên náo, như một áng văn xuôi nhẹ nhàng, với bối cảnh làng quê Việt Nam ngày xưa cũ, đây chỉ là những chuyện tình tang nho nhỏ, linh tinh vụn vặt của hai anh và mọi người xung quanh.', 'Câu chuyện hàng ngày về một anh thầy đồ và một anh thầy lang.\r\n\r\nKhông ồn ào, huyên náo, như một áng văn xuôi nhẹ nhàng, với bối cảnh làng quê Việt Nam ngày xưa cũ, đây chỉ là những chuyện tình tang nho nhỏ, linh tinh vụn vặt của hai anh và mọi người xung quanh.\r\n\r\nChương đầu tiên của cuốn sách “Bẩm thầy Tường, có thầy Vũ đến tìm!” được tác giả đăng lần đầu tiên trên fanpage “Hôm nay Vuy vẽ” vào tháng 4/2020. Trước sự ngỡ ngàng của chính tác giả Hoàng Tường Vy, chỉ trong một thời gian ngắn, chương truyện đó đã thu hút sự chú ý và yêu mến của hàng ngàn độc giả.', '1 cuốn sách “Bẩm thầy Tường, có thầy Vũ đến tìm!”. Kích thước 14.5×20.5cm, 232 trang in màu\r\n1 postcard ngẫu nhiên hình thầy Tường và thầy Vũ', 0.50, '2024-04-01', '2024-04-10', 1, 13, 631300.00, NULL),
(19, 10, 'Bẩm thầy Tường, có thầy Vũ đến tìm! – Tập 3', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/9c5ea263-2643-4bdb-0ed5-566d34ab3100/w=705', 'Tháng 12/2022, “Bẩm Thầy Tường, Có Thầy Vũ Đến Tìm!” của tác giả Hoàng Tường Vy, do Comicola phát hành vinh dự nhận giải Đồng của cuộc thi International Manga Award lần thứ 16. Đây là tác phẩm Việt Nam đầu tiên lọt vào danh sách nhận giải kể từ năm 2017.', 'Câu chuyện hàng ngày về một anh thầy đồ và một anh thầy lang.\r\n\r\nKhông ồn ào, huyên náo, như một áng văn xuôi nhẹ nhàng, với bối cảnh làng quê Việt Nam ngày xưa cũ, đây chỉ là những chuyện tình tang nho nhỏ, linh tinh vụn vặt của hai anh và mọi người xung quanh.\r\n\r\nChương đầu tiên của cuốn sách “Bẩm thầy Tường, có thầy Vũ đến tìm!” được tác giả đăng lần đầu tiên trên fanpage “Hôm nay Vuy vẽ” vào tháng 4/2020. Trước sự ngỡ ngàng của chính tác giả Hoàng Tường Vy, chỉ trong một thời gian ngắn, chương truyện đó đã thu hút sự chú ý và yêu mến của hàng ngàn độc giả.', '01 quyển sách 232 trang in màu.\r\n01 postcard ngẫu nhiên.\r\n01 4koma ngẫu nhiên.', 0.50, '2024-04-01', '2024-04-10', 1, 10, 513600.00, NULL),
(20, 7, 'Chương Cuối Của Mùa Hạ', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/6d9f21c3-6a6f-4084-c58c-527ae106c400/w=705', 'Đông không nói gì thêm, chỉ lặng lẽ hút thuốc. Con mèo trong quán lẩn mẩn mò ra, tò mò ngắm nhìn hai thằng đàn ông tư lự nhả những tâm sự màu bạc trắng vào thinh không.\r\n\r\n“Thì ra thanh xuân là thế hả?” – Đông cất lời, chẳng giống như một câu hỏi.\r\n\r\n“Có lẽ vậy.”\r\n\r\nTôi mân mê tấm ảnh, lật qua lật lại rồi nhìn lại một lần nữa vào gương mặt rạng rỡ của hai người của những ngày xưa cũ. Liệu thầy và cô, vào cái thời điểm ấy có mơ ước cho một thanh xuân đi trọn cùng nhau? Có một tưởng về một đoạn đời dài hạnh phúc thay vì cuộc chia ly chẳng rõ nguyên do năm ấy? Liệu hai người có thể mường tượng được ra, sau mấy chục năm thầy sẽ lặng lẽ biến mất, trong khi cô có lẽ còn ở đâu đó ngoài kia, mải miết với cuộc sống riêng mà chẳng hề biết rằng một phần tuổi trẻ của mình đã mãi mãi ra đi?\r\n\r\nThanh xuân, phải chăng chính là xinh đẹp và tàn khốc như vậy?”', 'Chương Cuối Của Mùa Hạ xoay quanh cuộc sống của Xuân – anh trợ giảng an phận, hài lòng với công việc trợ giảng tại trường cao đẳng mỹ thuật nọ. Cuộc sống tẻ nhạt của Xuân cộng hưởng cùng không khí an nhàn tại một đô thị ven biển, nơi chỉ bừng sáng vào mùa du lịch ngắn ngủi mỗi năm. Cuộc sống của Xuân trôi đi tuồn tuột cho tới một đêm định mệnh, ở quán bar cỏ quen thuộc, Xuân cùng lúc gặp được Hạ – mối tình định mệnh – và Đông – cậu bạn bảnh bao, kỳ lạ cứ vô tư can thiệp vào cuộc đời Xuân.\r\n\r\nChương Cuối Của Mùa Hạ không đi sâu vào những chuyện tình yêu tuổi trẻ, thay vào đó khắc họa cuộc sống của những chàng trai đang loay hoay định nghĩa cuộc đời mình giữa vô vàn biến số tình yêu, công việc và hoài bão sự nghiệp. Truyện được viết bởi tác giả Nam Thanh, Xuân Lan minh họa.\r\n\r\nĐặc biệt, Chương Cuối Của Mùa Hạ là tác phẩm đầu tiên của Comicola được phát hành song song đồng thời phiên bản sách giấy, và phiên bản sách điện tử đọc trên máy đọc sách (định dạnh .epub và .mobi). Bạn có thể đặt mua phiên bản sách điện tử trên nền tảng Comicola Ebook\r\n\r\nBên cạnh phiên bản phổ thông, có 500 bản sách có chữ ký của tác giả và họa sĩ dành cho 500 bạn đầu tiên mua sách trên Comicola Shop.', '500 bản có chữ ký có tác giả và họa sĩ minh họa.\r\nKhổ sách: 14.5 x 20.5.\r\nSố trang: 228.\r\nSố lượng in: 2000 cuốn.\r\nBìa: Ivory300 in màu 4/4, gấp cánh 8cm.\r\nRuột: giấy ốp 80. 24 trang màu 4/4.', 0.50, '2024-04-01', '2024-04-17', 1, 12, 133750.00, NULL),
(21, 9, 'Cánh Hoa Trôi Giữa Hoàng Triều – Tập 1', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/0f02e705-8a5b-42ee-5791-019608ffc900/w=705', 'Câu chuyện về vị nữ hoàng đế đầu tiên và cũng là duy nhất trong lịch sử Việt Nam.\r\n\r\nMột mối tình trẻ thơ khởi nguồn cho 1 cuộc chuyển giao quyền lực trước nay chưa từng có.\r\n\r\nSự khởi đầu và kết thúc của 2 triều đại phong kiến rực rỡ bậc nhất trong lịch sử…', 'Câu chuyện về vị nữ hoàng đế đầu tiên và cũng là duy nhất trong lịch sử Việt Nam.\r\n\r\nMột mối tình trẻ thơ khởi nguồn cho 1 cuộc chuyển giao quyền lực trước nay chưa từng có.\r\n\r\nSự khởi đầu và kết thúc của 2 triều đại phong kiến rực rỡ bậc nhất trong lịch sử…', '500 bản có chữ ký có tác giả và họa sĩ minh họa.\r\nKhổ sách: 14.5 x 20.5.\r\nSố trang: 228.\r\nSố lượng in: 2000 cuốn.\r\nBìa: Ivory300 in màu 4/4, gấp cánh 8cm.\r\nRuột: giấy ốp 80. 24 trang màu 4/4.\r\n', 0.50, '2024-04-01', '2024-04-10', 1, 14, 73830.00, NULL),
(22, 7, 'Tiểu thuyết Aftermath', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/6d7057f9-d429-40f9-2f1e-7fdf2b837800/w=705', 'Aftermath: Ác Quỷ Rừng Phế Tích được thực hiện với phần nội dung – kịch bản chắp bút bởi tác giả Nam Thanh và loạt tranh minh họa đặc biệt sống động tới từ họa sĩ Thành Phong. Với giọng văn cá tính cùng những ý tưởng xây dựng thế giới tương lai độc đáo, bộ đôi này đã đem tới một tác phẩm chất lượng, chỉn chu cả về phần “đọc” và “nhìn”, hứa hẹn hành trình dài hơi dự kiến kéo dài 7 tập của series Aftermath Saga.', 'Chuỗi tác phẩm Aftermath Saga lấy bối cảnh thế giới ở thế kỷ 23 và lấy mốc khởi đầu là sự kiện thảm họa nhà máy điện hạt nhân Chernobyl (1986) – trên thực tế là một dự án bí ẩn được thực hiện bởi Chính phủ Liên Xô cũ.\r\n\r\nNăm 1986, nhà máy điện hạt nhân Chernobyl phát nổ và lập tức biến bán kính hàng trăm kilomet xung quanh nó trở thành một vùng đất chết, đồng thời lưu giữ lại mối hiểm họa khổng lồ dưới lòng đất. Tuy nhiên trái với dự đoán của loài người, chỉ sau hơn 30 năm, Chernobyl nhanh chóng hồi sinh với hệ sinh quyển tuyệt vời khác.\r\n\r\nNăm 2120: Tập đoàn Ying Industries đưa ra cảnh báo về khả năng phát nổ của tàn tích Chernobyl, đồng thời lãnh trách nhiệm xử lý hậu quả, nhưng trên thực tế lại che đậy một âm mưu khác. Sử dụng nguồn năng lượng khổng lồ vẫn đang tồn tại ở Chernobyl, tập đoàn Ying muốn xây dựng một trạm phát sóng khổng lồ để phát ra tín hiệu điều khiển sóng não con người nhằm mục tiêu thống trị thế giới. Kế hoạch này thất bại và gây rò rỉ trực tiếp chất độc có hại ra khu vực rừng bao quanh Chernobyl.\r\n\r\nTheo dòng câu chuyện, người đọc sẽ dần tiếp cận với một thế giới vô tiền khoáng hậu với “Hạt Temno” – thứ vật chất thao túng sinh mệnh của vạn vật; Công nghệ thao túng trí não mang tên “Aftermath” cùng những chủng loài sinh vật hoang dã dần có được trí tuệ như con người. Kể từ đây, thế giới rộng lớn thứ kỷ 23 với đầy rẫy những biến động căng thẳng sẽ được mở ra, đan xen lẫn nhau một cách hấp dẫn, hé lộ nên âm mưu thống trị thế giới của một kẻ phản diện “bất tử”.', 'Kích thước: 13 x 19 cm\r\nSố trang: 184 trang', 0.50, '2024-04-01', '2024-04-10', 1, 11, 160500.00, NULL),
(23, 7, 'Tiểu thuyết Aftermath – Hậu Duệ Của Thép (Tập 2)', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/f77c1fe1-2619-4c69-b88a-1243be045a00/w=705', 'Trận chiến Rừng Đỏ đã đi tới tàn cục. Một đội quân mới xuất hiện tiếp quản khu rừng, vô tình đào bới lại thân thế bí ẩn của gã lính đánh thuê Yasha. Những chiến binh bóng ma từng ám ảnh quá khứ của Darya Palani tái xuất, ráo riết truy lùng tay người Nhật Mikazuki Sacai.', 'Trận chiến Rừng Đỏ đã đi tới tàn cục. Một đội quân mới xuất hiện tiếp quản khu rừng, vô tình đào bới lại thân thế bí ẩn của gã lính đánh thuê Yasha. Những chiến binh bóng ma từng ám ảnh quá khứ của Darya Palani tái xuất, ráo riết truy lùng tay người Nhật Mikazuki Sacai. \r\n\r\nCũng trong ngày buồn thảm nhất của khu rừng, một lực lượng cổ xưa trỗi dậy và ban tặng cho Nakil những quyền năng mới: kỳ diệu hơn, nhưng cũng chết chóc hơn. Liệu, đứa con của Rừng Đỏ sẽ sử dụng sức mạnh ấy ra sao? Trở thành một người bảo hộ với đức tin non trẻ, hay bước vào hành trình đen tối của Ác Quỷ Rừng Phế Tích?\r\n\r\nCách xa Chernobyl hơn 7.000 kilomet, một kẻ lạ mặt khác cũng đã bắt đầu hành động dưới danh nghĩa của một tổ chức hùng mạnh, trực tiếp thách thức quyền lực của Ying Industries. Chương mới của thế giới Aftermath sẽ chính thức khai mở với những sự kiện tại Đảo Nhân Tạo Jiinseng, xoay quanh hành trình tìm kiếm đứa con trai của Vi và Ying Fengwong. \r\n\r\nTập 2 của Aftermath Saga: “Hậu Duệ Của Thép” đã sẵn sàng ra mắt.', 'Kích thước: 13 x 19 cm\r\nSố trang: 184 trang', 0.50, '2024-04-01', '2024-04-10', 1, 15, 160500.00, NULL),
(24, 8, 'Truyện Tranh Long Thần Tướng – Tập 1', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/792e5ba1-8b8f-4125-246d-f449b5ab3700/w=705', '“Bước đột phá của truyện tranh dã sử” – Báo Thanh Niên “Sự kiện Long Thần Tướng đang hâm nóng lại niềm đam mê của nhiều người, pha trộn với sự ưu ái dành cho những sản phẩm theo trào lưu thế giới nhưng thuần Việt.” – Báo Tuổi Trẻ “Lần đầu tiên ở Việt Nam, bằng mô hình crowdfunding, dự án xuất bản bộ truyện tranh thuần Việt đã đi đến hồi kết đầy lạc quan.” – Báo Dân Trí', 'Long Thần Tướng, tập 1 là tác phẩm truyện tranh lịch sử của nhóm vẽ Phong Dương Comics. Được ra mắt vào tháng 11/2014, cuốn sách đã gây tiếng vang lớn trong dư luận và trở thành một trong những sự kiện xuất bản/văn hóa trong năm 2014. Với 330 triệu gây quỹ sản xuất, dự án Long Thần Tướng là dự án gây quỹ cộng đồng thành công nhất Việt Nam từ trước tới nay.', '500 bản có chữ ký có tác giả và họa sĩ minh họa.\r\nKhổ sách: 14.5 x 20.5.\r\nSố trang: 228.\r\nSố lượng in: 2000 cuốn.\r\nBìa: Ivory300 in màu 4/4, gấp cánh 8cm.\r\nRuột: giấy ốp 80. 24 trang màu 4/4.', 0.50, '2024-04-01', '2024-04-10', 1, 11, 73830.00, NULL),
(25, 8, 'Truyện Tranh Long Thần Tướng – Tập 2', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/099a5de4-8e7e-4da8-1baf-d4f477c1e800/w=705', '“Long Thần Tướng không chỉ là một cuốn truyện tranh mà là một tác phẩm nghệ thuật thật sự đẹp về hình thức lẫn nội dung” – Báo Tuổi Trẻ “Hai tuyến truyện hiện tại và quá khứ đan xen, bổ sung, tương trợ nội dung cho nhau và cùng nhau tạo ra một cốt truyện lôi cuốn.” – VnExpress “Truyện tranh có chất điện ảnh.” – Báo Thể Thao Văn Hóa', 'Long Thần Tướng là tác phẩm truyện tranh lịch sử của nhóm vẽ Phong Dương Comics. Được ra mắt vào tháng 11/2014, cuốn sách đã gây tiếng vang lớn trong dư luận và trở thành một trong những sự kiện xuất bản/văn hóa trong năm 2014. Với 330 triệu gây quỹ sản xuất, dự án Long Thần Tướng là dự án gây quỹ cộng đồng thành công nhất Việt Nam từ trước tới nay.', '500 bản có chữ ký có tác giả và họa sĩ minh họa.\r\nKhổ sách: 14.5 x 20.5.\r\nSố trang: 228.\r\nSố lượng in: 2000 cuốn.\r\nBìa: Ivory300 in màu 4/4, gấp cánh 8cm.\r\nRuột: giấy ốp 80. 24 trang màu 4/4.', 0.50, '2024-04-01', '2024-04-10', 1, 11, 73830.00, NULL),
(26, 8, 'Truyện Tranh Long Thần Tướng – Tập 3', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/18c1a939-c2b9-4545-19e4-73227444dd00/w=705', '“Việc “Long Thần Tướng” giành được giải thưởng quốc tế uy tín không chỉ là niềm vui lớn dành cho 2 tác giả cùng những độc giả mến mộ bộ truyện mà còn là niềm vinh dự cho truyện tranh Việt Nam khi lần đầu tiên một bộ truyện tranh lịch sử gây được tiếng vang mang tầm cỡ quốc tế.” – Báo Dân Trí “Ngoài chất lượng, Long thần tướng tập một tạo “cú hích” trong làng truyện tranh Việt. Đây là tác phẩm xuất bản theo hình thức gây quỹ cộng đồng đầu tiên. Sự thành công của hình thức này mở ra một hướng đi mới cho truyện tranh Việt.” – VnExpress', 'Long Thần Tướng là tác phẩm truyện tranh lịch sử của nhóm vẽ Phong Dương Comics. Được ra mắt vào tháng 11/2014, cuốn sách đã gây tiếng vang lớn trong dư luận và trở thành một trong những sự kiện xuất bản/văn hóa trong năm 2014. Với 330 triệu gây quỹ sản xuất, dự án Long Thần Tướng là dự án gây quỹ cộng đồng thành công nhất Việt Nam từ trước tới nay.', '500 bản có chữ ký có tác giả và họa sĩ minh họa.\r\nKhổ sách: 14.5 x 20.5.\r\nSố trang: 228.\r\nSố lượng in: 2000 cuốn.\r\nBìa: Ivory300 in màu 4/4, gấp cánh 8cm.\r\nRuột: giấy ốp 80. 24 trang màu 4/4.', 0.50, '2024-04-01', '2024-04-10', 1, 12, 73830.00, NULL),
(27, 8, 'Truyện Tranh Long Thần Tướng – Tập 4', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/c51c2cf2-658b-42f6-e91c-c8d09ff1b600/w=705', '“Long Thần Tướng là một cuốn tiểu thuyết hình ảnh tuyệt vời của Việt Nam, được vẽ rất thuyết phục và vẽ một cách tuyệt vời. Sự pha trộn giữa yếu tố thực tế, và hư cấu của tác phẩm được đối chiếu với các câu chuyện trong quá khứ và hiện tại của đất nước. Đây là một tác phẩm truyện tranh đẳng cấp cần được thưởng thức và ca ngợi trên toàn thế giới.” – Paul Gravett, nhà phê bình truyện tranh. Tác giả của MANGASIA: Cẩm nang nhập môn truyện tranh Châu Á. Chủ biên của 1001 tác phẩm truyện tranh mà bạn đọc phải đọc trước khi chết.', 'Long Thần Tướng là tác phẩm truyện tranh lịch sử của nhóm vẽ Phong Dương Comics. Được ra mắt vào tháng 11/2014, cuốn sách đã gây tiếng vang lớn trong dư luận và trở thành một trong những sự kiện xuất bản/văn hóa trong năm 2014. Với 330 triệu gây quỹ sản xuất, dự án Long Thần Tướng là dự án gây quỹ cộng đồng thành công nhất Việt Nam từ trước tới nay.', '500 bản có chữ ký có tác giả và họa sĩ minh họa.\r\nKhổ sách: 14.5 x 20.5.\r\nSố trang: 228.\r\nSố lượng in: 2000 cuốn.\r\nBìa: Ivory300 in màu 4/4, gấp cánh 8cm.\r\nRuột: giấy ốp 80. 24 trang màu 4/4.', 0.50, '2024-04-01', '2024-04-10', 1, 20, 73830.00, NULL),
(28, 1, 'Tai Mèo & Mặt Ngầu 3: Ổ Mèo náo loạn', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/0264cc1b-6b47-431a-3f2a-1a4b7ddc6f00/w=705', 'Cuốn sách Ổ Mèo náo loạn là một bộ truyện ngắn mang tính tự sự, nói về tình yêu của tác giả Mèo Mun Đen. Bộ truyện khi được xuất bản trên FB cá nhân của tác giả, đã được đón nhận vô cùng nồng nhiệt trong giới trẻ cả nước! Bạn có thể đọc online bộ truyện của Mèo Mun Đen tại đây.', 'Cuốn sách Ổ Mèo náo loạn là một bộ truyện ngắn mang tính tự sự, nói về tình yêu của tác giả Mèo Mun Đen. Bộ truyện khi được xuất bản trên FB cá nhân của tác giả, đã được đón nhận vô cùng nồng nhiệt trong giới trẻ cả nước!\r\n\r\nBạn có thể đọc online bộ truyện của Mèo Mun Đen tại đây.', 'Số trang: 112 trang.\r\nKích thước: 18 x 18 cm.\r\nLoại bìa: Bìa mềm có tay gập.\r\nGiá bìa: 79.000 VND.', 0.50, '2024-04-01', '2024-04-10', 1, 18, 84530.00, NULL),
(29, 4, 'Nhóm Máu O – Tập 1', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/9bcfc2bf-3497-4897-5a86-fdf67b089600/w=705', 'Tháng 2/2015, bắt nguồn từ 1 group kín của cộng đồng thí sinh cuộc thi đường lên đỉnh Olympia trên mạng, anh Hoàng Dương, 1 thí sinh thi Olympia năm 2001 đã có ý tưởng “Làm một cuốn truyện tranh nói về tinh thần Chinh phục đỉnh cao của cuộc thi Olympia.', 'Tháng 2/2015, bắt nguồn từ 1 group kín của cộng đồng thí sinh cuộc thi đường lên đỉnh Olympia trên mạng, anh Hoàng Dương, 1 thí sinh thi Olympia năm 2001 đã có ý tưởng “Làm một cuốn truyện tranh nói về tinh thần Chinh phục đỉnh cao của cuộc thi Olympia.', 'Tác giả: Dương Minh Đức\r\nSố trang: 140 trang\r\nKích thước: 13 x 19 cm', 0.50, '2024-04-01', '2024-04-10', 1, 13, 31030.00, NULL),
(30, 4, 'Nhóm Máu O – Tập 3', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/e4069a92-1aaf-42fa-627a-f5acc2aca500/w=705', 'Cuốn sách Nhóm Máu O – Tập 3 của tác giả Dương Minh Đức, hiện đang mở bán trên Comicola! Phiên bản online của truyện có thể đọc tại đây', 'Tháng 2/2015, bắt nguồn từ 1 group kín của cộng đồng thí sinh cuộc thi đường lên đỉnh Olympia trên mạng, anh Hoàng Dương, 1 thí sinh thi Olympia năm 2001 đã có ý tưởng “Làm một cuốn truyện tranh nói về tinh thần Chinh phục đỉnh cao của cuộc thi Olympia.', 'Tác giả: Dương Minh Đức\r\nSố trang: 140 trang\r\nKích thước: 13 x 19 cm', 0.50, '2024-04-01', '2024-04-10', 1, 10, 48150.00, NULL),
(31, 4, 'Nhóm Máu O – Tập 4', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/9bcfc2bf-3497-4897-5a86-fdf67b089600/w=705', 'Cuốn sách Nhóm Máu O – Tập 4 của tác giả Dương Minh Đức, hiện đang mở bán trên Comicola! Phiên bản online của truyện có thể đọc tại đây', 'Tháng 2/2015, bắt nguồn từ 1 group kín của cộng đồng thí sinh cuộc thi đường lên đỉnh Olympia trên mạng, anh Hoàng Dương, 1 thí sinh thi Olympia năm 2001 đã có ý tưởng “Làm một cuốn truyện tranh nói về tinh thần Chinh phục đỉnh cao của cuộc thi Olympia.', 'Tác giả: Dương Minh Đức\r\nSố trang: 140 trang\r\nKích thước: 13 x 19 cm', 0.50, '2024-04-01', '2024-04-10', 1, 12, 48150.00, NULL),
(32, 4, 'Tuyển Tập Oneshot Của Dương Đức', 'https://shop.comicola.com/wp-content/uploads/2024/03/DDO_PT.jpg', '“Tuyển Tập Oneshot Của Dương Đức” là tập hợp những truyện ngắn của Dương Đức và 2 chương đầu của “Mặt trời nơi vực thẳm”, kèm theo những trang truyện chưa từng được public bao giờ!', '“Tuyển Tập Oneshot Của Dương Đức” là tập hợp những truyện ngắn của Dương Đức và 2 chương đầu của “Mặt trời nơi vực thẳm”, kèm theo những trang truyện chưa từng được public bao giờ!', '01 cuốn sách “Tuyển Tập Oneshot Của Dương Đức” có chữ ký của tác giả. Sách dày 200 trang, kích thước 14.5 x 20.5 cm.\r\n02 card bo góc.', 0.50, '2024-04-01', '2024-04-10', 1, 20, 90950.00, NULL),
(33, NULL, 'Nghe Bảo Tôi Là Con Gái Của Vua – Tập 1', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/ee78ffde-01bc-4619-5ef5-4bfcf6234c00/w=705', 'Cuốn sách Nghe bảo tôi là con gái của vua – tập 1 của tác giả Hàn Quốc Bi Chu, họa sĩ Legna Kim được mở bán trên Comicola. Sách sẽ được phát hành vào đầu tháng 3/2019.\r\n\r\nPhiên bản bán trên Comicola bao gồm:\r\n\r\nMột cuốn truyện tranh Nghe bảo tôi là con gái của vua – tập 1.\r\nMột Postcard độc quyền chỉ bán tại Comicola.\r\nPhiên bản online của truyện có thể đọc tại đây', 'Nghe Bảo Tôi Là Con Gái Vua là bộ webtoon Hàn Quốc đình đám được Comicola mua bản quyền. Bộ truyện đứng thứ nhất trên bảng xếp hạng Tapas, đồng thời luôn nằm trong top các bộ webtoon ăn khách tại Trung, Hàn, Nhật hai năm gần đây. Với nội dung siêu hài hước cùng những tình huống dở khóc dở cười, truyện đã nhận được nhiều độc giả quan tâm, đón đọc. Comicola là đơn vị duy nhất tại Việt Nam nắm giữ bản quyền tác phẩm. Sắp tới, bộ truyện sẽ được xuất bản và đến gần hơn với độc giả.\r\n\r\nNghe Bảo Tôi Là Con Gái Vua nói về cô gái trẻ Kim Tú Vi đang tận hưởng cuộc sống hạnh phúc cùng người yêu, nữ chính bỗng rơi vào tình huống vô cùng oái ăm khi xuyên không trở thành một nàng công chúa. Những tưởng đây sẽ là một điều may mắn với cô khi được sống trong vương giả nhung lụa, chỉ tiếc cô đã xuyên đến một thế giới với tư tưởng trọng nam khinh nữ vô cùng kì quái. Liệu sự xuất hiện của cô công chúa nhỏ có thể thay đổi định kiến nặng nề và vận mệnh của chính minh?', 'Nghe bảo tôi là con gái của vua – tập 1\r\nTác giả: Bi Chu\r\nHọa sĩ: Legna Kim\r\nDịch giả: Ryen Ng\r\nKích thước: 14,5 x 20,5 cm\r\nSố trang: 204 trang\r\nGiá bìa: 95.000 VND', 0.50, '2024-04-01', '2024-04-10', 1, 12, 101650.00, NULL),
(34, NULL, 'Nghe Bảo Tôi Là Con Gái Của Vua – Tập 2', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/9b668af8-49b4-4da3-b635-31c805725100/w=705', 'Cuốn sách Nghe bảo tôi là con gái của vua – tập 2 của tác giả Hàn Quốc Bi Chu, họa sĩ Legna Kim được mở bán trên Comicola. Sách sẽ được phát hành vào đầu tháng 4/2019.', 'Nghe Bảo Tôi Là Con Gái Vua là bộ webtoon Hàn Quốc đình đám được Comicola mua bản quyền. Bộ truyện đứng thứ nhất trên bảng xếp hạng Tapas, đồng thời luôn nằm trong top các bộ webtoon ăn khách tại Trung, Hàn, Nhật hai năm gần đây. Với nội dung siêu hài hước cùng những tình huống dở khóc dở cười, truyện đã nhận được nhiều độc giả quan tâm, đón đọc. Comicola là đơn vị duy nhất tại Việt Nam nắm giữ bản quyền tác phẩm. Sắp tới, bộ truyện sẽ được xuất bản và đến gần hơn với độc giả.\r\n\r\nNghe Bảo Tôi Là Con Gái Vua nói về cô gái trẻ Kim Tú Vi đang tận hưởng cuộc sống hạnh phúc cùng người yêu, nữ chính bỗng rơi vào tình huống vô cùng oái ăm khi xuyên không trở thành một nàng công chúa. Những tưởng đây sẽ là một điều may mắn với cô khi được sống trong vương giả nhung lụa, chỉ tiếc cô đã xuyên đến một thế giới với tư tưởng trọng nam khinh nữ vô cùng kì quái. Liệu sự xuất hiện của cô công chúa nhỏ có thể thay đổi định kiến nặng nề và vận mệnh của chính minh?', 'Nghe bảo tôi là con gái của vua – tập 2\r\nTác giả: Bi Chu\r\nHọa sĩ: Legna Kim\r\nDịch giả: Ryen Ng\r\nKích thước: 14,5 x 20,5 cm\r\nSố trang: 196 trang\r\nGiá bìa: 95.000 VND', 0.50, '2024-04-01', '2024-04-10', 1, 12, 101650.00, NULL),
(35, NULL, 'Nghe Bảo Tôi Là Con Gái Của Vua – Tập 3', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/44e0ad27-1d68-4168-de0d-e4bf94279b00/w=705', 'Cuốn sách Nghe bảo tôi là con gái của vua – tập 3 của tác giả Hàn Quốc Bi Chu, họa sĩ Legna Kim được mở bán trên Comicola. Sách sẽ được phát hành vào đầu tháng 5/2019.', 'Nghe Bảo Tôi Là Con Gái Vua là bộ webtoon Hàn Quốc đình đám được Comicola mua bản quyền. Bộ truyện đứng thứ nhất trên bảng xếp hạng Tapas, đồng thời luôn nằm trong top các bộ webtoon ăn khách tại Trung, Hàn, Nhật hai năm gần đây. Với nội dung siêu hài hước cùng những tình huống dở khóc dở cười, truyện đã nhận được nhiều độc giả quan tâm, đón đọc. Comicola là đơn vị duy nhất tại Việt Nam nắm giữ bản quyền tác phẩm. Sắp tới, bộ truyện sẽ được xuất bản và đến gần hơn với độc giả.\r\n\r\nNghe Bảo Tôi Là Con Gái Vua nói về cô gái trẻ Kim Tú Vi đang tận hưởng cuộc sống hạnh phúc cùng người yêu, nữ chính bỗng rơi vào tình huống vô cùng oái ăm khi xuyên không trở thành một nàng công chúa. Những tưởng đây sẽ là một điều may mắn với cô khi được sống trong vương giả nhung lụa, chỉ tiếc cô đã xuyên đến một thế giới với tư tưởng trọng nam khinh nữ vô cùng kì quái. Liệu sự xuất hiện của cô công chúa nhỏ có thể thay đổi định kiến nặng nề và vận mệnh của chính mình?', 'Nghe bảo tôi là con gái của vua – tập 3\r\nTác giả: Bi Chu\r\nHọa sĩ: Legna Kim\r\nDịch giả: Ryen Ng\r\nKích thước: 14,5 x 20,5 cm\r\nSố trang: 156 trang\r\nGiá bìa: 95.000 VND', 0.50, '2024-04-01', '2024-04-10', 1, 13, 101650.00, NULL),
(36, NULL, 'Nghe Bảo Tôi Là Con Gái Của Vua – Tập 4', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/d9be846c-e51d-4594-94a9-5d86871afe00/w=705', 'Cuốn sách Nghe bảo tôi là con gái của vua – tập 4 của tác giả Hàn Quốc Bi Chu, họa sĩ Legna Kim được phát trên toàn quốc. Sách sẽ được phát hành vào 18/3/2020', 'Nghe Bảo Tôi Là Con Gái Vua là bộ webtoon Hàn Quốc đình đám được Comicola mua bản quyền. Bộ truyện đứng thứ nhất trên bảng xếp hạng Tapas, đồng thời luôn nằm trong top các bộ webtoon ăn khách tại Trung, Hàn, Nhật hai năm gần đây. Với nội dung siêu hài hước cùng những tình huống dở khóc dở cười, truyện đã nhận được nhiều độc giả quan tâm, đón đọc. Comicola là đơn vị duy nhất tại Việt Nam nắm giữ bản quyền tác phẩm. Sắp tới, bộ truyện sẽ được xuất bản và đến gần hơn với độc giả.\r\n\r\nNghe Bảo Tôi Là Con Gái Vua nói về cô gái trẻ Kim Tú Vi đang tận hưởng cuộc sống hạnh phúc cùng người yêu, nữ chính bỗng rơi vào tình huống vô cùng oái ăm khi xuyên không trở thành một nàng công chúa. Những tưởng đây sẽ là một điều may mắn với cô khi được sống trong vương giả nhung lụa, chỉ tiếc cô đã xuyên đến một thế giới với tư tưởng trọng nam khinh nữ vô cùng kì quái. Liệu sự xuất hiện của cô công chúa nhỏ có thể thay đổi định kiến nặng nề và vận mệnh của chính minh?', 'Nghe bảo tôi là con gái của vua – tập 4\r\nTác giả: Bi Chu\r\nHọa sĩ: Legna Kim\r\nDịch giả: Ryen Ng\r\nKích thước: 14,5 x 20,5 cm\r\nSố trang: 148 trang\r\nGiá bìa: 95.000 VND', 0.50, '2024-04-01', '2024-04-10', 1, 19, 101650.00, NULL);
INSERT INTO `product` (`id`, `author_id`, `title`, `thumbnail`, `description`, `introduce`, `information`, `weight`, `created_at`, `update_at`, `status`, `quantity`, `price`, `id_company`) VALUES
(37, NULL, 'Nghe Bảo Tôi Là Con Gái Của Vua – Tập 5', 'https://imagedelivery.net/qUfEtSOHlgMQ8zObLoE0pg/bf78912f-87da-4d13-d007-3d47d93d9700/w=705', 'Cuốn sách Nghe bảo tôi là con gái của vua – tập 5 của tác giả Hàn Quốc Bi Chu, họa sĩ Legna Kim được phát trên toàn quốc. Sách sẽ được phát hành vào ngày 25/09/2020', 'Nghe Bảo Tôi Là Con Gái Vua là bộ webtoon Hàn Quốc đình đám được Comicola mua bản quyền. Bộ truyện đứng thứ nhất trên bảng xếp hạng Tapas, đồng thời luôn nằm trong top các bộ webtoon ăn khách tại Trung, Hàn, Nhật hai năm gần đây. Với nội dung siêu hài hước cùng những tình huống dở khóc dở cười, truyện đã nhận được nhiều độc giả quan tâm, đón đọc. Comicola là đơn vị duy nhất tại Việt Nam nắm giữ bản quyền tác phẩm. Sắp tới, bộ truyện sẽ được xuất bản và đến gần hơn với độc giả.\r\n\r\nNghe Bảo Tôi Là Con Gái Vua nói về cô gái trẻ Kim Tú Vi đang tận hưởng cuộc sống hạnh phúc cùng người yêu, nữ chính bỗng rơi vào tình huống vô cùng oái ăm khi xuyên không trở thành một nàng công chúa. Những tưởng đây sẽ là một điều may mắn với cô khi được sống trong vương giả nhung lụa, chỉ tiếc cô đã xuyên đến một thế giới với tư tưởng trọng nam khinh nữ vô cùng kì quái. Liệu sự xuất hiện của cô công chúa nhỏ có thể thay đổi định kiến nặng nề và vận mệnh của chính mình?', 'Nghe bảo tôi là con gái của vua – tập 5\r\nTác giả: Bi Chu\r\nHọa sĩ: Legna Kim\r\nDịch giả: Ryen Ng\r\nKích thước: 14,5 x 20,5 cm\r\nSố trang: 164 trang\r\nGiá bìa: 95.000 VND', 0.50, '2024-04-01', '2024-04-10', 1, 16, 101650.00, NULL),
(165, 5, 'Gánh Hát Lưu Diễn Muôn Phương', 'https://firebasestorage.googleapis.com/v0/b/cnpm-c8641.appspot.com/o/files%2FScreenshot%202023-05-28%20221720.png?alt=media&token=e29c00ba-58e3-4e33-8840-945d16e459d8', 'Tập sách ảnh “Gánh Hát Lưu Diễn Muôn Phương” minh họa 36 loại hình nghệ thuật diễn xướng và lễ hội dân gian truyền thống ở khắp mọi miền đất nước Việt Nam qua góc nhìn của người thực hiện.', NULL, NULL, NULL, '2024-05-10', '2024-05-10', 1, 12, 214000.00, NULL),
(166, 5, 'Gánh Hát Lưu Diễn Muôn Phương', 'https://firebasestorage.googleapis.com/v0/b/cnpm-c8641.appspot.com/o/files%2FScreenshot%202023-05-28%20221720.png?alt=media&token=e29c00ba-58e3-4e33-8840-945d16e459d8', 'jasiudoihw', NULL, NULL, NULL, '2024-05-11', '2024-05-11', 1, 12, 96300.00, NULL),
(167, 5, 'asjh', 'https://firebasestorage.googleapis.com/v0/b/cnpm-c8641.appspot.com/o/files%2FScreenshot%202023-05-28%20221720.png?alt=media&token=e29c00ba-58e3-4e33-8840-945d16e459d8', 'ajdsidijdi', NULL, NULL, NULL, '2024-05-11', '2024-05-11', 1, 7, 96656.00, NULL),
(168, 5, 'Truyện cổ ....', 'https://firebasestorage.googleapis.com/v0/b/cnpm-c8641.appspot.com/o/files%2FScreenshot%202023-05-28%20221720.png?alt=media&token=e29c00ba-58e3-4e33-8840-945d16e459d8', 'sdadsad', NULL, NULL, NULL, '2024-05-12', '2024-05-12', 1, 12, 68967.00, NULL),
(169, NULL, 'sach', 'https://firebasestorage.googleapis.com/v0/b/cnpm-c8641.appspot.com/o/files%2F%C4%90%E1%BB%8Anh%20l%C3%BD%20gi%E1%BB%9Bi%20h%E1%BA%A1n%20k%E1%BA%B9p%202.png?alt=media&token=b6af3f63-72af-43f1-88a1-7570122c577d', 'sach nay do vc', NULL, NULL, NULL, '2024-09-25', '2024-09-25', 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_category`
--

CREATE TABLE `product_category` (
  `id_Product` int(11) NOT NULL,
  `id_Category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_category`
--

INSERT INTO `product_category` (`id_Product`, `id_Category`) VALUES
(1, 2),
(2, 6),
(3, 7),
(4, 2),
(4, 9),
(5, 2),
(6, 9),
(7, 9),
(8, 5),
(9, 5),
(10, 5),
(11, 5),
(12, 5),
(13, 5),
(14, 5),
(15, 3),
(16, 6),
(17, 5),
(17, 7),
(18, 5),
(18, 7),
(19, 5),
(19, 7),
(20, 4),
(20, 9),
(21, 5),
(21, 7),
(22, 3),
(23, 3),
(24, 8),
(25, 8),
(26, 8),
(27, 8),
(29, 3),
(29, 5),
(30, 3),
(30, 5),
(31, 3),
(31, 5),
(32, 4),
(33, 5),
(34, 5),
(35, 5),
(36, 5),
(37, 5),
(165, 5),
(166, 5),
(168, 7);

-- --------------------------------------------------------

--
-- Table structure for table `product_temp`
--

CREATE TABLE `product_temp` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `status` enum('temp','success') DEFAULT 'temp'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `status` int(11) NOT NULL COMMENT 'Trạng thái'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`, `status`) VALUES
(1, 'user', 1),
(2, 'admin', 1),
(3, 'employee', 1),
(4, 'manager', 1),
(7, 'stock employee', 1);

-- --------------------------------------------------------

--
-- Table structure for table `role_detail`
--

CREATE TABLE `role_detail` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `action_code` varchar(30) NOT NULL,
  `check_action` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role_detail`
--

INSERT INTO `role_detail` (`id`, `role_id`, `action_code`, `check_action`) VALUES
(1, 2, 'CREATE', 1),
(2, 2, 'EDIT', 1),
(3, 2, 'DELETE', 1),
(4, 2, 'VIEW', 1),
(5, 3, 'CREATE', 0),
(6, 3, 'EDIT', 0),
(7, 3, 'DELETE', 0),
(8, 3, 'VIEW', 1),
(9, 4, 'CREATE', 1),
(10, 4, 'EDIT', 1),
(11, 4, 'DELETE', 0),
(12, 4, 'VIEW', 1),
(17, 7, 'CREATE', 1),
(18, 7, 'EDIT', 1),
(19, 7, 'DELETE', 0),
(20, 7, 'VIEW', 1);

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

CREATE TABLE `role_permissions` (
  `role_id` int(11) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_permissions`
--

INSERT INTO `role_permissions` (`role_id`, `permission_id`) VALUES
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(4, 1),
(4, 2),
(4, 4),
(2, 25);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `email` varchar(150) NOT NULL COMMENT 'email',
  `password` varchar(255) NOT NULL COMMENT 'Mật khẩu',
  `status` int(11) NOT NULL COMMENT 'Trạng thái',
  `first_name` varchar(200) DEFAULT NULL,
  `last_name` varchar(200) DEFAULT NULL,
  `fullname` varchar(200) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `publicKey_Token` text DEFAULT NULL,
  `publicKey_RefreshToken` text DEFAULT NULL,
  `RefreshToken` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `role_id`, `email`, `password`, `status`, `first_name`, `last_name`, `fullname`, `phone_number`, `address`, `publicKey_Token`, `publicKey_RefreshToken`, `RefreshToken`) VALUES
(6, 1, 'haochau123@gmail.com', '12345', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 3, 'khanhp2004@gmail.com', '124', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 2, 'trungm8fordev@gmail.com', '$2y$10$SnZQu0lldM1WtdEQ2n692uXR/Hf.QXXCc8D0BHzP2zFwuefNHNjuG', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 1, 'teooclol1@gmail.com', '$2y$10$CMJbJu5y7ZCCVGVlnjpVbuJL9EMBWxTkqZvtiTvxgQBth0ZFQ2q96', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 1, 'levantrung1403@gmail.com', 'yuyu', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 1, 'levantrung@gmail.com', '$2b$10$72QkfjLLNykroHSi6KzEgeip/pwb3SPBqj4yBRGrDWt.WYLqRCoOq', 1, NULL, NULL, NULL, NULL, NULL, '-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEAr9nt9QKd5vpnICePxioDVVWpSxscG0phmIKdpSzejKg422avqmuk\nQa6nlzQCRMP0/OaaKtBXwiKTUk7kNT8mMcV00E/RI/XAFEVq5b+xCHoWFN+jpTEw\nmx73sPqCPly1A5/zxM1h36N2yDnpUF7aliQWwgi2miDuKbasn3FOo5wVYh3UX+Bt\nalL0MJjpPdQxVIRxwZ7TkoQTj89wjO2FNSgTgFAKzT7stDPMTb0SUJvONHuyBsDn\nte0KnOPYEJCupiAJ859vJ0sLqVmmmL0W6cP//VAMjwjs436paEVTxZurX9hbHMup\n+nIpJ4f2wzLeLdyySLm6C7Lm7QI9TwqWUQIDAQAB\n-----END RSA PUBLIC KEY-----\n', '-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEAwOMTE7XRnO/06mDdTOY7QF7ZiCrJhj6W8efVEJf13twxXTOlHNse\njBRFO+yJE4KvXdMeVdrEMlvmPq0BUUV4ma8sxmPsUmQkuAx+FX01YjNeAhLbeH6e\nN8vbdxm89UOGAkzFG3NQOETNicFgnradmDbpd9UOGbiuPJDCeZVkjbHYKEjpAdAP\npiMXH8d+8xTgXt3jo5Nxl84Cw+ET0t5JgJNgd3NHRd2CLDgzyj4GT55avpQOUYVD\nREUayYW7d0q9lwraAkZ5e6lZUf85pXPHqTO6jin2pngLKu3IK3S5FFo4xUjxARj5\nzNQUMie8CohHYBXdmBUa/WC1DAzAPRUijQIDAQAB\n-----END RSA PUBLIC KEY-----\n', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJBZ2VudCI6IlRodW5kZXIgQ2xpZW50IChodHRwczovL3d3dy50aHVuZGVyY2xpZW50LmNvbSkiLCJpcEFkZHJlc3MiOiI6OmZmZmY6MTI3LjAuMC4xIiwiaXNzdWVkQXQiOjE3Mjk2NzU2NDk0ODgsImlhdCI6MTcyOTY3NTY0OSwiZXhwIjo0MzIxNjc1NjQ5fQ.NbpmPi1CDly7hE7CKnnecuQ_4GE1lq2DLsC2jGLCBY2pjB0BQO0bD6VXteFiiRaHliFobe8rzf4SLtSQkj6YodvBjvgLcEZCZeJRksizUzUETg9xGF4j5kpUOjKQqM5K7maeMgL_OD5ea6M2cl4m-DDHEH1GEqoIHb_yaUS1AfkSBnFpVhrroZMyCzNmogwVdb8Y0lWX9aXAE_7PaEYGFtrl2nOtLfNYCQHqlmXZMl5VGo3Pcy7UvlW4XZ17ewfg8OXcKe1JhKPRnyh_Hb15klA4QXI_IkmE4cqpeRdJLkcIu_Ak_GPa8HokqChwPfKVE9qiTnEv3a-p1murO_w6oA'),
(13, 1, 'levantrung14032004@gmail.com', '$2b$10$wzCF3IpyfDdoSNW5jQSsOuOGpPUDacqUuxmWJYEIM.46OI08T1mxS', 1, NULL, NULL, 'Lê Văn Trung Lê Văn Trung', '0357255074', 'dduowng so 6 thon ha lang, Long Hưng, Quận Ô Môn, Thành phố Cần Thơ', '-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEAzLT4u8bVyWW+fbOHBwRwOasu/bin/1V0Z0BiVshFeUpshg+Pef4d\n6MWuSTu+if9xuVHVgKJFkL1pHJbdPw6xN4xBLgOZD0g1Dm5RmF8KiCFhry5+F5pW\n68EYp8OjlJk/5J0Cs7UMZCkKV2kTteSHzuFD0g3mJNNFeIrJja/1M9oVP01I5ff4\nDzAkvr6wOlIK1Zc6URSdT0Th0K5u39P83JBlNiSjVt/dS1RQpAqG8RqrbIiddGwG\nHribzLiabS76BB+IjVol9LQZqEjW3qct/O4UJ2dVD6Aj9gZOojXgVDD/ypr+7p1V\nYIRnkOtKWC0P6dtGMi8kvCmmB/fnxP/y1wIDAQAB\n-----END RSA PUBLIC KEY-----\n', '-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEA18zJ+Kj7GZIu+hxFbdzt4kElKi7FQ3y3ZmDc6tyN48+qmSJ8Z84I\ndLvgrutTWm+SXKvQwkgBr8h2Ln94QnoN7Kq1CBCrpQ6ALwTEcZCQTi62rEfXguIB\nzP+B8CdpqzawDUzZXUBe+iPq005sVUboeWdn+/fWuyZum/R38C4ur+M8t8JT+1Pu\nn3SruBbk0gDmKpgnW+x6ve54H6uh8s2trpVZqTHKL+4dsTlCQSVPHoYiIjAlQd6I\nntFJmcDtl7hoKGmKwYg32litNgtLRnG/xhVy8TCNseKeUPnQ+AUNTVOVFLu0BxWq\n5d2xMINEJ/mu/HSFGFLiBdFaJiqiD1xoYQIDAQAB\n-----END RSA PUBLIC KEY-----\n', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInVzZXJBZ2VudCI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMzAuMC4wLjAgU2FmYXJpLzUzNy4zNiIsImlwQWRkcmVzcyI6Ijo6MSIsImlzc3VlZEF0IjoxNzI5NzQxNDkyMTU2LCJpYXQiOjE3Mjk3NDE0OTIsImV4cCI6NDMyMTc0MTQ5Mn0.AIiU6C85qPlkUwWLOfWtCs304cyp4IkUWPBpyJv9qJ6gvu1X8wgj1Lc7h37vvvWe_a_J8uwVfHXSu2witW6N2ld4PEBUu7LaDHs36U1lSQAEawtny_3GhGtUJf8yaru0tqn43HQkAw_JMI9B3tUnffs_Xz6bl9fPNJgckzaL3EKWhELjMxggOhHVH9Cg_FAhkrar8NH06aJIPjXYdSYAjIfznXlpm-O_9EsjZVP6YEFOabfqHab-OSUh6dl5EP639vQl8xdyGGpKf67EvU6k1S5aP8nzHROKX5rY4kmDXwAP5ASq3EXr8frPtS_yt8jgfV2X7DQ0KJ01XyoTjGKciA'),
(14, 1, 'nguyencongtrung13@gmail.com', '$2b$10$QDvOtBv45.KLiAPI7CEIPO3T0ElYBG44C.NHD.hmj5b71yj8Y5/Im', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 1, 'nguyencongtrung123@gmail.com', '$2b$10$fDIfX3Z36vhMz2/4njYTCO8jjHfUlMIeTSsTPGjbj4GyQEXxHo2du', 1, NULL, NULL, NULL, NULL, NULL, '-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEAwDpwdaayS+ShMKJZiBglihUmAuWM6k2BQBgHyEBVQ4KAGgRWM4AW\nXpT96GmRVVJLsBBpN0uftm5uSjm3qbFi/P5EzCnzfj+OeJOX0bbgBW7WoauOmyBv\nFP0sKB3Wz5Uv/NkOCQJvTWYGIA82XM0h7uhlLMg0MpKvv5cGCbDyzR96JEFe8aI5\nfMETbENoRgix0wVifSWxf4Ghexrf7NXMU3Jy+WA61AO0sdeTKyuGGJ8AvFyO7UfQ\ncpm5zuRXFLQI4YZdthtGH4TajP4oukDtlWuEpkWEPS0QJpPDMe5nO+KHQMVuX8hO\nAml7Z+e6a/utVcszy91bShn0q9XJD1f8xwIDAQAB\n-----END RSA PUBLIC KEY-----\n', '-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEAq3Iue73N70Wpz1Akwhz/OHdF9j2pCZUTWlugwHDxGgpbOvlca6MQ\nIOyJT5Q32ZT2Ejt3NUKWHXIwF3KQ128jDZFQw61k/YjxBKEOFk140PD8oMOUXNq1\n4rfZ5vnuD9up1ne2FXkWJejDNtOUJ0T5oXZUxfkU12RHwW0oM2MrMaq3rRvQ+Vdw\n+S8i16fME2gdPKSztFcd+McBtpNlqQtiGgLxg0Pd7k7eAgayZWGQf6L6KwStEPHk\nRrAJUOXi/cRakb0iUYErb9LI6+bD5ISSo9wPXuI6fM4PI8Pg88ssmGA2Mx9MBF9m\nORwepflMJL47foW+0RiAyHpPYLFx4qtTlwIDAQAB\n-----END RSA PUBLIC KEY-----\n', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJBZ2VudCI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMzAuMC4wLjAgU2FmYXJpLzUzNy4zNiBFZGcvMTMwLjAuMC4wIiwiaXBBZGRyZXNzIjoiOjoxIiwiaXNzdWVkQXQiOjE3MzAyODMyNzk0MDcsImlhdCI6MTczMDI4MzI3OSwiZXhwIjo0MzIyMjgzMjc5fQ.R1LOsyMcbNcbDTVTk36F4nmtdHspjtU_WPAnXBNCvpMAjFGLxkWtawlfOg1c9CQQg-ZyCtTJBbddlYIv68PgNCM-KOsGEhya3BPE5epyLJis5EgvkAWua8fh7fJ4mOO3NS0Rk1yc7hJe423__biZNFIzJjCKKCLO6K2eBNSwHkTQ2TnelunFhEfRkLmZo_Lon8GjU7TP_XZRx9Y8VVJJl1wtEwMTHlFwotvvrpbxxO1x-87Wif6MeOYFHlr5jyHckNZYyzlm0EeWX4MCUkaiEAQK97X_aUdINgHRmFfMfTY_tP0LNb3viBJIe_w8yeRfSAlWGxsBNy5NwHEred2aPA');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addressdetail`
--
ALTER TABLE `addressdetail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_address_detail` (`id_user`);

--
-- Indexes for table `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD KEY `fk_cart_user` (`id_user`),
  ADD KEY `fk_cart_product` (`id_product`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_delivery`
--
ALTER TABLE `company_delivery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupon_for_user`
--
ALTER TABLE `coupon_for_user`
  ADD KEY `fk_coupon_for_user` (`id_user`),
  ADD KEY `fk_coupon_id` (`id_coupon`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD KEY `fk_emloyee_role` (`role_id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_gallery_products` (`product_id`);

--
-- Indexes for table `goodsreceived`
--
ALTER TABLE `goodsreceived`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `goodsreceiveddetails`
--
ALTER TABLE `goodsreceiveddetails`
  ADD PRIMARY KEY (`idReceived`,`idProduct`),
  ADD KEY `idProduct` (`idProduct`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order_user` (`user_id`),
  ADD KEY `fk_order_emloyee` (`employee_id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orderdetail_order` (`order_id`),
  ADD KEY `fk_orderdetail_product` (`product_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_author` (`author_id`);

--
-- Indexes for table `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`id_Product`,`id_Category`),
  ADD KEY `FK_category` (`id_Category`);

--
-- Indexes for table `product_temp`
--
ALTER TABLE `product_temp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_detail`
--
ALTER TABLE `role_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_role_detail_role` (`role_id`);

--
-- Indexes for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD KEY `role_id` (`role_id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_role` (`role_id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addressdetail`
--
ALTER TABLE `addressdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `author`
--
ALTER TABLE `author`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Khóa chính', AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `company_delivery`
--
ALTER TABLE `company_delivery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `coupon`
--
ALTER TABLE `coupon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Khóa chính', AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT for table `goodsreceived`
--
ALTER TABLE `goodsreceived`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Khóa chính', AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Khóa chính', AUTO_INCREMENT=170;

--
-- AUTO_INCREMENT for table `product_temp`
--
ALTER TABLE `product_temp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `role_detail`
--
ALTER TABLE `role_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addressdetail`
--
ALTER TABLE `addressdetail`
  ADD CONSTRAINT `fk_address_detail` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `fk_cart_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `fk_cart_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Constraints for table `coupon_for_user`
--
ALTER TABLE `coupon_for_user`
  ADD CONSTRAINT `fk_coupon_for_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `fk_coupon_id` FOREIGN KEY (`id_coupon`) REFERENCES `coupon` (`id`);

--
-- Constraints for table `gallery`
--
ALTER TABLE `gallery`
  ADD CONSTRAINT `fk_gallery_products` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `goodsreceiveddetails`
--
ALTER TABLE `goodsreceiveddetails`
  ADD CONSTRAINT `goodsreceiveddetails_ibfk_1` FOREIGN KEY (`idReceived`) REFERENCES `goodsreceived` (`id`),
  ADD CONSTRAINT `goodsreceiveddetails_ibfk_2` FOREIGN KEY (`idProduct`) REFERENCES `product` (`id`);

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `fk_order_employee` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  ADD CONSTRAINT `fk_order_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `fk_orderdetail_order` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
  ADD CONSTRAINT `fk_orderdetail_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `product_category`
--
ALTER TABLE `product_category`
  ADD CONSTRAINT `FK_category` FOREIGN KEY (`id_Category`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `FK_product` FOREIGN KEY (`id_Product`) REFERENCES `product` (`id`);

--
-- Constraints for table `role_detail`
--
ALTER TABLE `role_detail`
  ADD CONSTRAINT `fk_role_detail_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

--
-- Constraints for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

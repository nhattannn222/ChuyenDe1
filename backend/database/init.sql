-- Tạo cơ sở dữ liệu nếu chưa tồn tại với bộ mã hóa utf8mb4
DROP DATABASE IF EXISTS advisors;
CREATE DATABASE IF NOT EXISTS university
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Sử dụng cơ sở dữ liệu university
USE university;

-- Drop bảng advisors nếu tồn tại và tạo lại
DROP TABLE IF EXISTS advisors;
CREATE TABLE advisors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tai_khoan VARCHAR(20) NOT NULL,
    ho_ten VARCHAR(100) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Drop bảng students nếu tồn tại và tạo lại
DROP TABLE IF EXISTS students;
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ma_sv VARCHAR(20) NOT NULL UNIQUE,
    ho_ten VARCHAR(100) NOT NULL,
    ngay_sinh DATE NOT NULL,
    gioi_tinh ENUM('Nam', 'Nữ', 'Khác') NOT NULL,
    dien_thoai VARCHAR(15),
    cccd VARCHAR(20),
    email VARCHAR(100) NOT NULL,
    email_phu VARCHAR(100),
    noi_sinh VARCHAR(100),
    dan_toc VARCHAR(50),
    ton_giao VARCHAR(50),
    hien_dien ENUM('Đang học', 'Đã tốt nghiệp', 'Đã nghỉ học'),
    ho_khau VARCHAR(200)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Drop bảng courses nếu tồn tại và tạo lại
DROP TABLE IF EXISTS courses;
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ma_sv VARCHAR(20) NOT NULL,
    lop VARCHAR(20),
    nganh VARCHAR(100),
    chuyen_nganh VARCHAR(100),
    khoa VARCHAR(100),
    he_dao_tao VARCHAR(50),
    nien_khoa VARCHAR(20),
    co_van_id INT,
    FOREIGN KEY (ma_sv) REFERENCES students(ma_sv) ON DELETE CASCADE,
    FOREIGN KEY (co_van_id) REFERENCES advisors(id) ON DELETE SET NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Drop bảng accounts nếu tồn tại và tạo lại
DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') DEFAULT 'student',
    ma_sv VARCHAR(20),
    FOREIGN KEY (ma_sv) REFERENCES students(ma_sv) ON DELETE SET NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tạo bản ghi mẫu vào bảng advisors
INSERT INTO advisors (tai_khoan, ho_ten)
VALUES ('90872', 'Nguyễn Quân')
ON DUPLICATE KEY UPDATE tai_khoan = VALUES(tai_khoan);

-- Tạo bản ghi mẫu vào bảng students
INSERT INTO students (ma_sv, ho_ten, ngay_sinh, gioi_tinh, dien_thoai, cccd, email, email_phu, noi_sinh, dan_toc, ton_giao, hien_dien, ho_khau)
VALUES ('22050101', 'Nguyễn Hoàng Nhật Tân', '2004-02-22', 'Nam', '0765162467', '086204007811', '22050101@student.bdu.edu.vn', 'nhnt205@gmail.com', 'Sóc Trăng', 'Kinh', 'Không', 'Đang học', 'Hiếu Thuận, H Vũng Liêm, Vĩnh Long')
ON DUPLICATE KEY UPDATE ma_sv = VALUES(ma_sv);

-- Tạo bản ghi mẫu vào bảng courses
INSERT INTO courses (ma_sv, lop, nganh, chuyen_nganh, khoa, he_dao_tao, nien_khoa, co_van_id)
VALUES ('22050101', '25TH01', 'Công nghệ thông tin', 'Robotics và Trí tuệ nhân tạo', 'Công nghệ thông tin', 'Đại học chính quy', '2022-2026', 1)
ON DUPLICATE KEY UPDATE ma_sv = VALUES(ma_sv);

-- Tạo bản ghi mẫu vào bảng accounts
INSERT INTO accounts (username, password, role, ma_sv)
VALUES 
    ('nhatan2205', '$2b$10$kEuiKj1bZfuk7ChO5KXL/ORF7MtRgZFOEGUzSuFQLOzW6v.hR3DO6', 'student', '22050101'),
    ('admin', '$2b$10$TFO2Wr9BP9kzLP8JYZHslOYMb93NVUORRgWsmLQ5M.kj74ETLV0B2', 'admin', NULL)
ON DUPLICATE KEY UPDATE username = VALUES(username);

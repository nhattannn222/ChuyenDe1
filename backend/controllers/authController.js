// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Đăng ký người dùng
exports.register = (req, res) => {
    const { username, password, ma_sv } = req.body;

    // Kiểm tra nếu tên đăng nhập đã tồn tại
    db.query('SELECT * FROM accounts WHERE username = ?', [username], (err, results) => {
        if (err) return res.status(500).json({ message: 'Lỗi máy chủ', error: err });
        if (results.length > 0) return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });

        // Mã hóa mật khẩu
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ message: 'Lỗi khi mã hóa mật khẩu', error: err });

            // Thêm người dùng mới vào cơ sở dữ liệu
            const sql = 'INSERT INTO accounts (username, password, ma_sv, role) VALUES (?, ?, ?, ?)';
            db.query(sql, [username, hashedPassword, ma_sv, 'student'], (err, results) => {
                if (err) return res.status(500).json({ message: 'Lỗi khi đăng ký tài khoản', error: err });
                res.status(201).json({ 
                    statusCode: 201,
                    message: 'Đăng ký thành công' });
            });
        });
    });
};

// Đăng nhập
exports.login = (req, res) => {
    const { username, password } = req.body;

    // Kiểm tra tên đăng nhập
    db.query('SELECT * FROM accounts WHERE username = ?', [username], (err, results) => {
        if (err) return res.status(500).json({ message: 'Lỗi máy chủ', error: err });
        if (results.length === 0) return res.status(400).json({ message: 'Tên đăng nhập không tồn tại' });

        // Kiểm tra mật khẩu
        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: 'Lỗi khi kiểm tra mật khẩu', error: err });
            if (!isMatch) return res.status(400).json({ message: 'Sai mật khẩu' });

            // Tạo JWT token
            const token = jwt.sign({ id: results[0].id, username: results[0].username }, 'secretkey', { expiresIn: '1h' });
            res.json({ message: 'Đăng nhập thành công', token });
        });
    });
};

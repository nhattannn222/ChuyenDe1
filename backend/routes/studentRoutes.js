// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Lấy thông tin sinh viên
router.get('/students/:ma_sv', studentController.getInfoStudents);

module.exports = router;

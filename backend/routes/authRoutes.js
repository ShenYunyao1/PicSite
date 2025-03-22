// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 用户注册
router.post('/register', authController.register);

// 用户登录
router.post('/login', authController.login);

// 密码重置
router.post('/reset-password', authController.resetPassword);

module.exports = router;
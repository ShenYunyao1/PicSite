// backend/controllers/authController.js
const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const bcrypt = require('bcrypt');
const redisClient = require('../config/redis');

exports.registerUser = async (req, res) => {
    const { email, password, nickname } = req.body;

    try {
        // 检查用户是否已存在
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        // 哈希密码
        const hashedPassword = await bcrypt.hash(password, 10);

        // 创建用户
        await User.create(email, hashedPassword, nickname);

        // 发送验证邮件
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        redisClient.setex(email, 300, verificationCode); // 存储验证码，有效期5分钟

        
        // 这里需要设置nodemailer的配置
        const transporter = nodemailer.createTransport(smtpTransport({
            host: 'smtp.126.com', // 邮箱服务器
            port: 465, // 端口
            secure: true, // 使用 SSL
            auth: {
                user: 'photosite@126.com', // 邮箱账号
                pass: 'KUj4SVA7qPGYGrV9' // 邮箱密码
            }
        }));
        // 发送邮件逻辑
        const mailOptions = {
            from: 'photosite@126.com', // 发件人
            to: email, // 收件人
            subject: 'PhotoSite Verification Code', // 主题
            html: `
                <p>Welcome to PhotoSite!</p>
                <p>Please enter the following verification code to verify your email address:</p>
                <h2>${verificationCode}</h2>
                <p>This code will expire in 5 minutes.</p>
                <p>If you did not request this verification code, please ignore it.</p>`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Email sent:'+ info.response);
            }
        });

        // 发送邮件的代码
        

        res.status(201).json({ message: 'User registered! Please check your email for verification.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updatePassword(email, hashedPassword);
        res.status(200).json({ message: 'Password reset successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
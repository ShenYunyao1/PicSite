// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const searchRoutes = require('./routes/searchRoutes');
const redisClient = require('./config/redisClient');

const app = express();
const PORT = process.env.PORT || 3000;

// 创建 MySQL 连接
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to MySQL');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/search', searchRoutes);

// 错误处理
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 关闭数据库连接
process.on('exit', () => {
    db.end();
    console.log('Database connection closed');
});

// 关闭 Redis 连接
process.on('exit', () => {
    redisClient.quit();
    console.log('Redis connection closed');
});

// 导出 app
module.exports = app;
// backend/controllers/uploadController.js
const Photo = require('../models/Photo');
const multer = require('multer');
const path = require('path');

// 设置 multer 存储选项
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // 使用时间戳和文件扩展名
    }
});

const upload = multer({ storage });

// 上传照片
// 注意：这里的路由需要在路由配置中设置上传文件的字段名，如：app.use('/api/photos', upload.single('photo'), photoController.uploadPhotos);
// 上传照片 API 接口
exports.uploadPhotos = (req, res) => {
    const { userId, title } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded!' });
    }

    const url = `http://yourdomain.com/uploads/${file.filename}`; // 替换为您的域名
    const thumbnailUrl = url; // 这里可以生成缩略图

    Photo.create(userId, title, url, thumbnailUrl)
        .then(() => res.status(201).json({ message: 'Photo uploaded!', url }))
        .catch(err => res.status(500).json({ error: err.message }));
};

// 用于 multer 中间件的导出
exports.upload = upload.single('photo'); // 'photo' 是上传文件的字段名
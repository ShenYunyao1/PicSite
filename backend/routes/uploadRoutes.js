// backend/routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // 设置上传目录

// 上传照片
router.post('/photos', upload.single('photo'), uploadController.uploadPhoto);

// 上传专辑封面
router.post('/albums/cover', upload.single('cover'), uploadController.uploadCover);

module.exports = router;
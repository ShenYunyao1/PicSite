// backend/routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// 搜索用户
router.get('/users', searchController.searchUsers);

// 搜索照片
router.get('/photos', searchController.searchPhotos);

// 搜索标签
router.get('/tags', searchController.searchTags);

module.exports = router;
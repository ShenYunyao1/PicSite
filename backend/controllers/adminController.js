// backend/controllers/adminController.js
const User = require('../models/User');
const Photo = require('../models/Photo');
const Album = require('../models/Album');
const Comment = require('../models/Comment');
const Like = require('../models/Like');

exports.getDashboardData = async (req, res) => {
    try {
        const totalUsers = await User.count(); // 假设 User 模型有 count 方法
        const totalPhotos = await Photo.count(); // 假设 Photo 模型有 count 方法
        const totalAlbums = await Album.count(); // 假设 Album 模型有 count 方法
        const totalComments = await Comment.count(); // 假设 Comment 模型有 count 方法
        const totalLikes = await Like.count(); // 假设 Like 模型有 count 方法

        res.status(200).json({
            totalUsers,
            totalPhotos,
            totalAlbums,
            totalComments,
            totalLikes,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserStats = async (req, res) => {
    const { userId } = req.params;

    try {
        const userPhotos = await Photo.getByUserId(userId); // 假设 Photo 模型有 getByUserId 方法
        const userComments = await Comment.getByUserId(userId); // 假设 Comment 模型有 getByUserId 方法
        const userLikes = await Like.getByUserId(userId); // 假设 Like 模型有 getByUserId 方法

        res.status(200).json({
            userPhotos,
            userComments,
            userLikes,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
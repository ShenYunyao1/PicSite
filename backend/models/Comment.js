// backend/models/Comment.js
const db = require('../config/db');

const Comment = {
    create: (photoId, userId, content) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO comments (photo_id, user_id, content) VALUES (?, ?, ?)';
            db.query(sql, [photoId, userId, content], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    getByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM comments WHERE user_id = ?';
            db.query(sql, [userId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    count: () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT COUNT(*) AS count FROM comments';
            db.query(sql, (err, results) => {
                if (err) reject(err);
                resolve(results[0].count);
            });
        });
    }
};

module.exports = Comment;
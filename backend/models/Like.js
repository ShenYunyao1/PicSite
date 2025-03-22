// backend/models/Like.js
const db = require('../config/db');

const Like = {
    create: (photoId, userId) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO likes (photo_id, user_id) VALUES (?, ?)';
            db.query(sql, [photoId, userId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    getByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM likes WHERE user_id = ?';
            db.query(sql, [userId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    count: () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT COUNT(*) AS count FROM likes';
            db.query(sql, (err, results) => {
                if (err) reject(err);
                resolve(results[0].count);
            });
        });
    }
};

module.exports = Like;
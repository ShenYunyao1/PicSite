// backend/models/Album.js
const db = require('../config/db');

const Album = {
    create: (userId, title, coverPhotoId) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO albums (user_id, title, cover_photo_id) VALUES (?, ?, ?)';
            db.query(sql, [userId, title, coverPhotoId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },
    
    getByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM albums WHERE user_id = ?';
            db.query(sql, [userId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    count: () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT COUNT(*) AS count FROM albums';
            db.query(sql, (err, results) => {
                if (err) reject(err);
                resolve(results[0].count);
            });
        });
    }
};

module.exports = Album;
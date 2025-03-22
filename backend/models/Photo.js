// backend/models/Photo.js
const db = require('../config/db');

const Photo = {
    create: (userId, title, url, thumbnailUrl) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO photos (user_id, title, url, thumbnail_url) VALUES (?, ?, ?, ?)';
            db.query(sql, [userId, title, url, thumbnailUrl], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    getByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM photos WHERE user_id = ?';
            db.query(sql, [userId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    count: () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT COUNT(*) AS count FROM photos';
            db.query(sql, (err, results) => {
                if (err) reject(err);
                resolve(results[0].count);
            });
        });
    }
};

module.exports = Photo;
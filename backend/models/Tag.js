// backend/models/Tag.js
const db = require('../config/db');

const Tag = {
    create: (name) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO tags (name) VALUES (?)';
            db.query(sql, [name], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM tags WHERE id = ?';
            db.query(sql, [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    },

    getAll: () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM tags';
            db.query(sql, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },

    count: () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT COUNT(*) AS count FROM tags';
            db.query(sql, (err, results) => {
                if (err) reject(err);
                resolve(results[0].count);
            });
        });
    }
};

module.exports = Tag;
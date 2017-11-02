
let mysql = require('mysql');

let md5 = require('md5');

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog'
});

db.md5 = md5;

module.exports = db;
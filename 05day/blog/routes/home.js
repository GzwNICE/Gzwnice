let express = require('express');

// 前台主路由
let home = express.Router();

home.get('/', (req, res) => {
    res.render('home/index', {});
});

home.get('/article', (req, res) => {
    res.render('home/article', {});
});

home.get('/about', (req, res) => {
    res.render('home/about', {});
});

home.get('/center', (req, res) => {
    res.render('home/center', {});
});

home.get('/join', (req, res) => {
    res.render('home/join', {});
});

home.get('/login', (req, res) => {
    res.render('home/login', {});
});

home.get('/register', (req, res) => {
    res.render('home/register', {});
});

module.exports = home;
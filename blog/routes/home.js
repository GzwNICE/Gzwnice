let express = require('express');

// 前台主路由
let home = express.Router();

home.get('/',(req,res)=>{
    res.render('home/index',{});
});

home.get('/article',(req,res)=>{
    res.render('home/article',{});
});

module.exports = home;
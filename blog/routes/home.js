
let express = require('express');

// 处理用户数据
let user = require('../models/user');

// 处得博客文章数据
let post = require('../models/post');

// 前台主路由
let home = express.Router();

// 前台首页
home.get('/', (req, res) => {

    // 每页多少条 2
    // 当前第几页 参数
    // 总共多少页 总条数 / 每页条数

    // 每页2条数据
    let pageSize = 2;
    // 当前页
    let page = req.query.page || 1;

    post.count((err, row) => {

        if(err) return;

        // 总条数
        let total = row.total;
        // 总页数
        let pages = Math.ceil(total / pageSize);

        post.findAll(pageSize, page, (err, rows) => {
            console.log(rows)
            if(!err) {
                res.render('home/index', {
                    posts: rows,
                    pages: pages,
                    page: page
                });
            }
        });

    });


});

home.get('/article', (req, res) => {
    // req.query
    // 根据文章id获得文件信息
    post.find(req.query.id, (err, rows) => {
        if(!err) {
            // console.log(rows[0])
            res.render('home/article', {post: rows[0]});
        }
    });
});

// 注册
home.get('/register', (req, res) => {
    res.render('home/register', {});
});

// 登录
home.get('/login', (req, res) => {
    res.render('home/login', {});
});

// 注册用户
home.post('/register', (req, res) => {
    // 获取前端传递的表单数据
    // console.log(req.body);

    // 调用模型，插入数据库
    user.insert(req.body, (err) => {
        if(!err) {
            // 数据库插入成功
            // 响应结果（json数据）
            res.json({
                code: 10000,
                msg: '添加成功!'
            });
        }
    });
});

// 登录
home.post('/login', (req, res) => {
    // 获得前端传递的参数
    console.log(req.body);

    // 检测登录（根邮箱和密码）
    user.auth(req.body.email, req.body.pass, (err, row) => {
        if(!err) {

            // 存一个 session
            // 如果 req.session.loginfo 不为
            // false 则认为登录成功
            req.session.loginfo = row;

            // 登录成功
            // 响应结果（json数据）
            res.json({
                code: 10000,
                msg: '登录成功!'
            });
        }
    });
});

module.exports = home;
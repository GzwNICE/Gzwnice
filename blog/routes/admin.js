
let express = require('express');

let post = require('../models/post');

let user = require('../models/user');

let multer  = require('multer');
// let upload = multer({dest: 'public/admin/uploads/avatar'});

// 通过 diskStorage 实现目录位置和文件名的自定义操作
var storage = multer.diskStorage({
    // 自定义文件目录
    destination: function (req, file, cb) {
        cb(null, 'public/admin/uploads/avatar');
    },
    // 自定义文件名称
    filename: function (req, file, cb) {
        let extname = file.originalname.slice(file.originalname.lastIndexOf('.'));
        cb(null, file.fieldname + '-' + Date.now() + extname);
    }
})

var upload = multer({storage: storage});

// 后台主路由
let admin = express.Router();

// 后台首页
admin.get('/', (req, res) => {
    res.render('admin/index', {});
});

admin.get('/settings', (req, res) => {
    // 通过 session 获得用户的id
    let uid = req.session.loginfo.id;
    user.find(uid, (err, rows) => {
        // console.log(err);
        if(!err) {
            res.render('admin/settings', {user: rows[0]});
        }
    });
})

// 添加博客文章
admin.get('/add', (req, res) => {
    res.render('admin/manage', {action: '/admin/add'});
});

// 编辑博客文章
admin.get('/edit', (req, res) => {
    // req.query 获得 get 的参数
    // 然后根据参数id 获得文章
    post.find(req.query.id, (err, rows) => {
        // console.log(rows[0]);
        if(!err) {
            res.render('admin/manage', {
                post: rows[0],
                action: '/admin/modify'
            });
        }
    });
})

// 文章列表
admin.get('/list', (req, res) => {
    // 查询博客列表
    post.findAll((err, rows) => {
        if(err) {
            // 查询失败
            return res.send('数据库错误！');
        }

        // 查询成功
        res.render('admin/list', {posts: rows});
    });
});

// 退出登录
admin.get('/logout', (req, res) => {
    // 清空登录信息
    req.session.loginfo = null;
    // 跳转至登录页
    res.redirect('/login');
})

// 添加博客
admin.post('/add', (req, res) => {
    // 获得表单提交的博客内容
    // console.log(req.body);

    // 当前登录用户即为作者
    // 通过session可以读取到作者的id
    // 然后将id记录在博客文章中
    req.body.uid = req.session.loginfo.id;
    // 插入博客内容
    post.insert(req.body, (err) => {
        if(!err) {
            // 成功后响应结果
            res.json({
                code: 10000,
                msg: '添加成功!'
            });
        }
    })

});

// 删除博客
admin.get('/delete', (req, res) => {
    // 通过 query 可以接收 get 的参数
    // console.log(req.query);

    // 根据博客id删除
    post.delete(req.query.id, (err) => {
        if(!err) {
            // 删除成功
            res.json({
                code: 10000,
                msg: '删除成功!'
            });
        }
    });

});

// 更新个人资料
admin.post('/update', (req, res) => {
    // 获得表单数据
    // console.log(req.body);
    // 获得用户id
    let uid = req.session.loginfo.id;
    // 根据用户id更新内容
    user.update(uid, req.body, (err) => {
        if(!err) {
            // 更新成功
            res.json({
                code: 10000,
                msg: '更新成功!'
            });
        }
    });
})

admin.post('/modify', (req, res) => {
    // 
    // console.log(req.body);

    let id = req.body.id;

    delete req.body.id;

    post.modify(id, req.body, (err) => {
        if(!err) {
            res.json({
                code: 10000,
                msg: '修改成功!'
            })
        }
    });
});

// 头像上传
// 使用中间件 upload.single 中间件 实现文件上传
admin.post('/upfile', upload.single('avatar'), (req, res) => {

    // console.log(req.file);
    // 响应结果
    res.json({
        code: 10000,
        msg: '上传成功',
        // 图片上传后的路径
        path: req.file.path
    });
})

module.exports = admin;
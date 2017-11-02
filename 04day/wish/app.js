let http = require('http');

let url = require('url');

let mime = require('mime');

// 引入 数据库 模块
let db = require('./config/db');

let path = require('path');

let fs = require('fs');

let template = require('art-template');

// 配置模板目录
template.defaults.root = './views';
// 配置模板后缀
template.defaults.extname = '.html';
template.defaults.rules[1].test = /##([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*##/;

let app = http.createServer();

app.listen(3000, (err) => {
    if (!err) {
        console.log('服务器在端口 3000 启动成功！');
    }
})

app.on('request', (req, res) => {

    // 设计路由

    let {pathname,query} = url.parse(req.url, true);

    res.render = function (tpl, data) {
        let html = template(tpl, data);

        res.writeHeader(200, {
            'Content-Type': 'text/html; charset=UTF-8'
        });

        res.end(html);
    }

    switch (pathname) {
        case '/':
        case '/index':
            db.query('select * from lists',(err,rows)=>{
                if(!err){
                    res.render('index',{lists:rows});
                }
            });
        break;

        case '/create':
            // 随机生成序号
            query.no = Math.ceil(Math.random() * 100000);
            // 设置系统时间为添加时间
            query.datetime = new Date();

            // 执行sql语句
            db.query('insert into lists set ?', query, (err, info) => {
                if (!err) {
                    // 响应数据为 json 格式
                    res.writeHeader('200', {
                        'Content-Type': 'application/json'
                    })
                    // 响应结果
                    res.end(JSON.stringify({
                        code: 10000,
                        meg: '添加成功！',
                        result:query
                    }));
                }
            });
            break;

        default:
            // 获得静态资源真实路径
            let realPath = path.join('./public', pathname);
            // 根据真实路径读取资源
            fs.readFile(realPath, (err, data) => {
                if (!err) {
                    // 设置响应头
                    res.writeHeader(200, {
                        'Content-Type': mime.getType(realPath)
                    })
                    // 响应主体
                    res.end(data);
                }
            })
    }

})
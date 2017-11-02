
let express = require('express');

let bodyParser = require('body-parser');

let session = require('express-session');

let app = express();

app.listen(3000);

// 模板引擎
app.set('view engine', 'xtpl');

// 模板目录
app.set('views', './views');

// 静态资源
app.use(express.static('./public'));
// 当访问 /public 时，去public中查找资源
app.use('/public', express.static('./public'));

// 解析 post 数据的中间件
app.use(bodyParser.urlencoded({extended: false}));

// 处理 session 的中间件
// 当使用了 session 中间件后
// 就在 req 上添加了一个 session
// 属性，通过这个属性可以实现设置和
// 读取session目的
// 有点类似于 PHP 的 $_SESSION
app.use(session({
    secret: 'fad',
    resave: false,
    saveUninitialized: false
}));

// 在Nodejs中默认情况下 session 是放到
// 内存当中的，所以当服务器重启后
// session 也会消失

// http 要求在请求头设置前不允许有响应主体
app.use('/admin', (req, res, next) => {
    // 检测登录
    if(!req.session.loginfo && req.url != '/login') {
        // return res.redirect('/login');
    }

    next();
})

// 可以通过路由来区分前台网站和后台网站
// 但是前/后台网站又可以分成若干子路由

// 如果才能将主路和子路联系起来呢？

// 使用 express.Router() 来创建主路由，主路由可以认为是一个中间件
// 主路由下再创建子路由

let admin = require('./routes/admin');
let home = require('./routes/home');

app.use('/admin', admin);

app.use('/', home);
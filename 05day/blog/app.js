
let express = require('express');

let app = express();

app.listen(3000);

app.set('view engine','xtpl');

app.set('views','./views');

app.use(express.static('./public'));

// 可以通过路由来区分前台网站和后台网站，
// 但是前/后台网站又可以分成若干子路由

// 使用express.Router()来创建主路由，主路由可以认为是一个中间件
// 主路由下再创建子路由

let admin = require('./routes/admin');
let home = require('./routes/home');

app.use('/admin',admin);
app.use('/',home);
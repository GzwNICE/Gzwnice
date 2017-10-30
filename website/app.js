let express = require('express');

let app = express();

// bodyParser 即中间件
var bodyParser = require('body-parser')

app.listen(3000);

app.set('view engine', 'xtpl');

app.set('views', './views');

app.use(express.static('public'));

// 使用中件件来解析post数据，
// urlencoded 解析 application/x-www-form-url-encoded
// 中间件会在 req 上添加一个 body 属性，req.body
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    // 请求头
    // console.log(req.headers);
    // 在express中直接使用req.query
    // 来获得地址参数
    // console.log(req.url);

    res.render('index', {});
});
app.get('/doc', (req, res) => {
    res.render('doc', {});
});
app.get('/blog', (req, res) => {
    res.render('blog', {});
});
app.get('/text',(req,res)=>{
    res.render('text',{});
})

app.post('/',(req,res)=>{
    // 如果要解析post的参数
    // 需要使用一个中间件名字叫 body-parser

    // border-parser是一个第三方模块

    console.log(req.body);

    res.send('post方式');
})
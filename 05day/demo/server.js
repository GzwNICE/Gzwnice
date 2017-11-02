
let express = require('express');

let app = express();

app.listen(3000);

// 引入自已封装的中间件
let bodyParser = require('./body-parser');
// 使用中间件
app.use(bodyParser.urlencoded());
// 设置模板路径
app.set('views','./views');
// 设置模板引擎
app.set('view engine','xtpl');
// 设计路由
app.get('/',(req,res)=>{
    res.render('index',{});
})

app.post('/add',(req,res)=>{
    console.log(req.body);

    res.send('hello!');
})
let express = require('express');

let app = express();

app.listen(3000);

app.set('view engine', 'xtpl');

app.set('views', './views');

app.use(express.static('public'));


app.use((req,res,next)=>{
    req.gzw='高志文';
    req.abc='itcast';
    next();
});
// 中间件的本质就是一个函数，此函数可以接收到请求和响应，
// 并且在此函数内部处理对请求和响应的逻辑

// function static(){
//      return function(){

//     // }
// }
// app.use(static);

app.use(function(req,res,next){
    // next将请求和响应传递给下一个中间件
    // 如果不调用next那么下一个中间件会执行等待
    next();
});

// 关于顺序
app.use((req,res,next)=>{
    console.log(req.gzw);
    console.log(req.abc);

    next();
});

// 中间件支持路由
app.use('/add',(req,res,next) => {
    req.demo = '测试';
    req.text = '测试吧';
    next();
});

// 所有路由
// app.use(()=>{});

app.get('/add', (req, res) => {
    console.log(req.demo);
    console.log(req.text);
    res.render('index', {});
});

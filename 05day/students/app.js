// express的基本应用

// 相当于require('http');
let express = require('express');
// 相当于createServer();
let app = express();
// 设置模板目录为./views
app.set('views','./views');
// 一个使用模板引擎xtpl，模板后缀为xtpl
// xtpl模块不需要手动引入，Express内部负责自动引入
app.set('view engine','xtpl');

// 监听端口
app.listen(3000);

// express.static 专门处理静态资源
app.use(express.static('public'));

// express没有内置模板引擎功能
// 但它可以非常方便的支持其他模板引擎 xtpl

// 客户端(浏览器)以get方式请求的时候
app.get('/',(req,res)=>{
    // 封装后的send相当于之前的write + end
    // res.send('hello express get!');
    res.render('add',{});
});

app.get('/add',(req,res)=>{
    res.render('add',{});
});

app.get('/list',(req,res)=>{
    res.render('list',{});
});
// 客户端(浏览器)以post方式请求的时候
app.post('/add',(req,res)=>{
    res.send('hello express post!')
})
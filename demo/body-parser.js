
let queryString = require('querystring');

exports.urlencoded = function(){
    // 解析处理 post 数据
    return function(req,res,next){
        let text = '';
         // 接收post数据
        req.on('data',(chunk)=> {
            text +=chunk;
        });
        req.on('end',()=>{
            // 解析post数据
            req.body = queryString.parse(text);
            next();
        });
    }
}
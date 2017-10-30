
let http = require('http');

let app = http.createServer();

app.listen(3001);

app.on('require',()=>{
    if(req.method== 'get'){

    }else if(req.method== 'post'){

    }
})
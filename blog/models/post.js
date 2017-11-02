
let db = require('./db');

// 插入数据
exports.insert = (data, cb) => {
    // sql 语句
    let query = 'insert into posts set ?';
    // 执行 sql 语句
    db.query(query, data, (err) => {
        if(err) {
            // 失败回调
            return cb(err);
        }
        // 成功回调
        cb(null);
    })

}

// 查询所有
exports.findAll = (...args) => {
    // 由于调用时参数个数不确定
    // 所以使用 ... 语法来接收参数
    // ... 语法可以将所有参数接收到一个数组中
    let query, offset, pageSize, cb;

    // 当只传一个参数，并且为回调函数时
    if(args.length == 1 && typeof args[0] == 'function') {
        // 查询所有数据，不做分页处理
        // sql 语句
        query = 'select * from posts left join users on posts.uid = users.id';
        
        // 第1个参数就是回调函数
        cb = args[0];
    } else {
        // 当传递3个参数时
        // 根据参数位置获取相对应参数
        // 每页条数
        pageSize = args[0];
        // 当前第几页
        page = args[1];

        // 第3个参数为回调函数
        cb = args[2];

        // 计算页码数据起始位置
        offset = (page - 1) * pageSize;

        // sql 语句
        query = 'select * from posts left join users on posts.uid = users.id limit ?, ?';
    }
    
    // 执行 sql 语句
    db.query(query, [offset, pageSize], (err, rows) => {
        if(err) {
            // 失败回调
            return cb(err);
        }

        // 成功回调
        cb(null, rows);
    });
}

// 删除
exports.delete = (id, cb) => {
    // sql 语句
    let query = 'delete from posts where id = ?';

    // 执行 sql 
    db.query(query, id, (err) => {
        if(err) {
            // 失败回调
            return cb(err);
        }

        // 成功回调
        cb(null);
    })
}

// 查找单条博客
module.exports.find = (id, cb) => {
    // sql 语句
    let query = 'select * from posts left join users on posts.uid = users.id where posts.id = ?';
    // 执行 sql 
    db.query(query, id, (err, rows) => {
        if(err) {
            return cb(err);
        }

        cb(null, rows);
    })
}

// 修改博客内容
exports.modify = (id, data, cb) => {
    // sql 语句
    let query = 'update posts set ? where id = ?';

    // db.query(query, [data, id], (err) => {
    //     if(err) {
    //         return cb(err);
    //     }

    //     cb(null);
    // })
    // 执行 sql
    db.query(query, [data, id], cb);
}

// 博客总条数

exports.count = function (cb) {

    let query = 'select count(*) as total from posts';

    db.query(query, (err, rows) => {
        if(err) {
            return cb(err);
        }

        cb(null, rows[0]);
    })
}

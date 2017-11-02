
let db = require('./db');

// 插入用户
exports.insert = function (data, cb) {
    // 插入sql语句 
    let query = 'insert into users set ?';

    // 密文处理
    data.pass = db.md5(data.pass);

    // 执行 sql 语句
    db.query(query, data, (err) => {
        // 有错误，处理错误
        if(err) {
            return cb(err);
        }

        // 没有错误
        cb(null);
    });
}

// 验证登录
exports.auth = function (email, password, cb) {

    // 查询 sql 
    let query = 'select * from users where email = ?';

    // 根据邮箱名称查询数据库中记录的密码
    db.query(query, email, (err, rows) => {
        if(err) {
            return cb(err);
        }

        // 数据中的密码与用户提交上的密码如果一致
        // 则认证通过（登录成功）
        // 根据用户输入的密码进行检测判断
        if(rows[0].pass == db.md5(password)) {
            return cb(null, rows[0]);
        }

        // 登录失败
        cb({msg: '用户或密码错误！'});
    })
}

// 查询个人资料
exports.find = (id, cb) => {
    // sql 语句
    let query = 'select * from users where id = ?';
    // 执行 sql 语句
    db.query(query, id, (err, rows) => {
        if(err) {
            // 失败
            return cb(err);
        }
        // 成功
        cb(null, rows);
    })
}

exports.update = function (id, data, cb) {
    // sql 语句
    let query = 'update users set ? where id = ?';
    // 执行 sql 语句
    db.query(query, [data, id], (err) => {
        if(err) {
            // 失败
            return cb(err);
        }
        // 成功
        cb(null);
    })
}
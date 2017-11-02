// define 可以传入一个回调函数
// define可以传入一个数组参数，用来指定依赖关系
// 如果存在依赖关系，那么回掉函数可以通过形参来接
// 收被依赖模块的返回值，按顺序一一对应
define(['./d','./f','./e'], function (d , fff) {

    console.log("c");

    // d是d模块的返回值
    console.log(d);

    // ppp是e模块的返回值
    console.log(ppp);




    var name = '小明';

    var sayHi = function () {
        console.log('小明你好');
    }

    // 公开内容数据
    return {
        name: name,
        sayHi: sayHi
    }

});
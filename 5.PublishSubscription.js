/**
 * author kyf
 * date 2018.07.22
 * desc 发布订阅者模式
 */

// // 实现售楼处售楼信息发布订阅模式
// var salesOffices = {}; // 定义售楼处

// salesOffices.clientList = {}; // 缓存列表，存放订阅者的回调函数

// salesOffices.listen = function( key, fn ) {
//     if ( !this.clientList[ key ] ) { // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
//         this.clientList[ key ] = [];
//     }
//     this.clientList[ key ].push( fn ); // 订阅的消息添加进消息缓存列表
// };

// salesOffices.trigger = function() { // 发布消息
//     var key = Array.prototype.shift.call( arguments ), // 取出消息类型
//         fns = this.clientList[ key ]; // 取出该消息对应的回调函数集合
//     if ( !fns || fns.length === 0 ) { // 如果没有订阅该消息，则返回
//         return false;
//     }
//     for ( var i = 0, fn; fn = fns[ i++ ]; ) {
//         fn.apply( this, arguments ); // arguments 是发布消息时附送的参数
//     }
// };

// salesOffices.listen('squareMeter88', function( price ) { // 小明订阅88平方米房子的消息
//     console.log( '价格= ', + price)
// });

// salesOffices.listen('squareMeter110', function( price ) { // 小红订阅110平方米房子的消息
//     console.log( '价格= ' + price)
// });

// salesOffices.trigger( 'squareMeter88', 2000 ); // 发布 88 平方米房子的价格
// salesOffices.trigger( 'squareMeter110', 3000 ); // 发布 110 平方米房子的价格


// 对以上模式实现通用方法
// var event = {
//     clientList: [], // 缓存列表，存放订阅者的回调函数

//     listen: function ( key, fn ) { // 订阅接口
//         if ( !this.clientList[ key ] ) { // 如果没有此类型的订阅，创建一个该类的列表
//             this.clientList[ key ] = []
//         }

//         this.clientList[ key ].push( fn ) // 订阅消息添加进消息列表
//     },

//     trigger: function () { // 发布消息接口
//         var key = Array.prototype.shift.call( arguments ), // 取出消息类型
//             fns = this.clientList[ key ];
//         if ( !fns || fns.length === 0 ) { // 没有订阅该消息，则返回
//             return false;
//         }
//         for ( var i = 0, fn; fn = fns[ i++ ]; ) {
//             fn.apply( this, arguments ); // arguments 是发布消息时附送的参数
//         }
//     }
// }

// var installEvent = function( obj ) {
//     for ( var i in event ) {
//         obj[ i ] = event[ i ];
//     }
// }

// var salesOffices = {};
// installEvent(salesOffices)

// salesOffices.listen('squareMeter88', function( price ) { // 小明订阅88平方米房子的消息
//     console.log( '价格= ', + price)
// });

// salesOffices.listen('squareMeter110', function( price ) { // 小红订阅110平方米房子的消息
//     console.log( '价格= ' + price)
// });

// salesOffices.trigger( 'squareMeter88', 2000 ); // 发布 88 平方米房子的价格
// salesOffices.trigger( 'squareMeter110', 3000 ); // 发布 110 平方米房子的价格



// 实现全局的发布-订阅对象
var Event = (function () {
    var clientList = {},
        listen,
        trigger,
        remove;
    listen = function (key, fn) {
        if (!clientList[key]) {
            clientList[key] = []
        }
        clientList[key].push(fn)
    }
    trigger = function () {
        var key = Array.prototype.shift.call(arguments),
            fns = clientList[key];
        if (!fns || fns.length === 0) {
            return false
        }
        for (var i=0, fn; fn = fns[i++];) {
            fn.apply(this, arguments)
        }
    }
    return {
        listen: listen,
        trigger: trigger
    }
})()

Event.listen('squareMeter88', function(price) {
    console.log('价格: ' + price)
})

Event.listen('squareMeter100', function(price) {
    console.log('价格: ' + price)
})

Event.trigger('squareMeter88', 4000);
Event.trigger('squareMeter100', 5000);


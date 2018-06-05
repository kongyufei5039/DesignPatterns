/**
 * author kyf
 * date 2018.05.28
 * desc 简单单例模式实现
 */

 var  Singleton = function( name ) {
     this.name = name;
     this.instance = null;
 };

 Singleton.prototype.getName = function() {
    console.log(this.name);
 };

 Singleton.getInstance = function( name ) {
    if ( !this.instance ) {
        this.instance = new Singleton( name );
    }
    return this.instance;
 }

 //简单的测试
 var a = Singleton.getInstance('sven1');
 var b = Singleton.getInstance('sven2');

 console.log(a === b);  // true
 console.log(a.getName()); // sven1
 console.log(b.getName()); // sven1


 /**
  * author kyf
  * date 2018.05.28
  * desc 代理惰性加载单例模式实现
  */

var getSingle = function( fn ) {
    var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
}

var fn = function() {
    // do somthing...
    i += 1;
    return i;
}

var i = 0;
var count = getSingle(fn);

console.log(count()) // 1
console.log(count()) // 1



/**
 * author kyf
 * date 2018.06.24
 * desc 代理模式解决HTTP请求合并问题
 */

 var synchronousFile = function( id ) {
   console.log( '开始同步文件，id 为：' + id )
 }
  // 此处为了在html渲染完后再获取element对象用了setTimeout处理
 setTimeout(function() {
    var checkboxs = document.getElementsByTagName( 'input' );

    for ( var i = 0, c; c = checkboxs[ i++ ]; ) {
      c.onclick = function() {
      if ( this.checked === true ) {
          proxySynchronousFile( this.id );
        }
      }
    };
 });

 //代理对象
 var proxySynchronousFile = (function( id ) {
   var cache = [], // 保存一段时间内需要同步的ID
       timer; // 定时器
   return function( id ){
      cache.push( id );
      if ( timer ) { // 保证不会覆盖已经启动的定时器
        return;
      }

      timer = setTimeout(function(){
          synchronousFile( cache.join(',') ); // 2秒后向本体发送需要同步的ID集合
          clearTimeout( timer ); // 清空定时器
          timer = null;
          cache.lengh = 0; // 清空 ID 集合
      }, 2000);
   }
 })();


/**
 * author kyf
 * date 2018.06.05
 * desc 面向对象语言实现策略模式
 */

 // question: 计算年终奖: S级 工资的4倍， A级 工资的3倍， B级 工资的2倍

 var performanceS = function () {};
 performanceS.prototype.calculate = function ( salary ) {
    return salary * 4;
 };

 var performanceA = function () {};
 performanceA.prototype.calculate = function ( salary ) {
     return salary * 3;
 };

 var performanceB = function () {};
 performanceB.prototype.calculate = function ( salary ) {
     return salary * 2;
 };

 var Bonus = function () {
     this.salary = null;
     this.strategy = null;
 };

Bonus.prototype.setSalary = function ( salary ) {
    this.salary = salary;
};

Bonus.prototype.setStrategy = function ( strategy ) {
    this.strategy = strategy;
};

Bonus.prototype.getBonus = function () {
    return this.strategy.calculate( this.salary );
};

//简单测试
var bonus = new Bonus();

bonus.setSalary( 2000 );
bonus.setStrategy( new performanceA() );

console.log( bonus.getBonus() );

bonus.setStrategy( new performanceS() );

console.log( bonus.getBonus() );


/**
 * author kyf
 * date 2018.06.05
 * desc JavaScript实现策略模式
 */

 // question: 计算年终奖: S级 工资的4倍， A级 工资的3倍， B级 工资的2倍

 var strategies = {
    'S': function ( salary ) {
        return salary * 4;
    },
    'A': function ( salary ) {
        return salary * 3;
    },
    'B': function ( salary ) {
        return salary * 2
    }
 };

 var calculateBonus = function ( level, salary ) {
    return strategies[ level ]( salary );
 };

 // 简单测试

 console.log(calculateBonus( 'S', 2000) );
 console.log(calculateBonus( 'B', 2000) );

 /**
  * author kyf
  * date 2018.06.06
  * desc 使用策略模式实现表单校验
  */

  var validataStrategies = {
    isNonEmpty: function ( value, errorMsg ) { // 不为空
    if ( value === '' ) {
        return errorMsg;
    }
    },
    minLength: function ( value, length, errorMsg ) { // 限制最小长度
    if ( value.length < length ) {
        return errorMsg;
    }
    },
    isMobile: function ( value, errorMsg ) { // 手机号码格式
    if ( !/^1[3|5|8][0-9]{9}$/.test(value) ) {
        return errorMsg;
    }
    }
  };

  var Validator = function () {
    this.catch = [] // 保存校验规则
  };

  Validator.prototype.add = function ( dom, rule, errorMsg ) {
    var ary = rule.split( ':' ); // 把 strategy 和参数分开
    this.catch.push(function() { // 把校验的步骤用空函数包起来，并且放入 catch
        var strategy = ary.shift(); // 用户挑选的 strategy
        ary.unshift( dom.value ); // 把input的 value 添加进参数列表
        ary.push( errorMsg ); // 把 errorMsg 添加进参数列表
        return  validataStrategies[strategy].apply( dom, ary );
    });
  };

  Validator.prototype.start = function () {
    for ( var i = 0,  validatorFunc; validatorFunc = this.catch[ i++ ]; ) {
        var msg = validatorFunc();
        if ( msg ) {
            return msg;
        }
    }
  };

  var validateFunc = function () {
    var validator = new Validator(); // 创建一个Validator对象
    
    // 添加一些校验规则
    validator.add( registerForm.userName, 'isNonEmpty', '用户名不能为空' );
    validator.add( registerForm.password, 'minLength:6', '密码长度不能少于6位' );
    validator.add( registerForm.phoneNumber, 'isMobile', '手机号码格式不正确' );

    var errorMsg = validator.start(); // 获取验证结果
    return errorMsg;
  };

  var registerForm = document.getElementById( 'registerForm' );
  registerForm.onsubmit = function () {
    var errorMsg = validateFunc();
    if ( errorMsg ) {
        alert( errorMsg );
        return false;
    }
    return false;
  };
  




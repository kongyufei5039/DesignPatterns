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
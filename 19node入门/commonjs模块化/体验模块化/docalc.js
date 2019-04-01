const calc = require('./calc');
'use strict';
let args = process.argv.slice(2);
if (args.length < 3) {
    throw error('参数异常...');
}
let n1 = calc.convert(args[0]);
let op = args[1];
let n2 = calc.convert(args[2]);

switch (op) {
    case '+':
        console.log(calc.add(n1, n2));
        break;
    case '-':
        console.log(calc.sub(n1, n2));
        break;
    case '*':
    case '×':
        console.log(calc.mul(n1, n2));
        break;
    case '/':
    case '÷':
        console.log(calc.divide(n1, n2));
    default:
        break;
}

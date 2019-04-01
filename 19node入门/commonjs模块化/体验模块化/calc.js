/* define([
    'require',
    'dependency'
], function(require, factory) {
    'use strict';
}); */
'use strict';
function convert(input) {
    return parseFloat(input);
}

function add(n1, n2) {
    return n1 + n2;
}


function sub(n1, n2) {
    return n1 - n2;
}

function mul(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    return n1 / n2;
}

// exports.add = add;
module.exports = {
    add, sub, mul, divide, convert
}

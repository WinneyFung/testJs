import React from 'react';
import { render } from 'react-dom';
import calc from './calc';
import './a';
console.log(document.querySelector('#root'))
render(<h2>hello,winney</h2>, document.querySelector('#root'));
console.log(calc.sum(1, 3));
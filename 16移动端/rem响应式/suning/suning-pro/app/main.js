// const greeter = require("./Greeter.js");
// document.getElementById("root").appendChild(greeter());
// main.js
import React from "react";
import { render } from "react-dom";
import Greeter from "./Greeter";
import './less/main.less';
import $ from 'zepto'
import { start } from "pretty-error";
// import 'zepto/src/touch.js';
function getWidth(ele) {
    let w = window.getComputedStyle(ele).width;
    let regexp = /([0-9]+)([a-zA-Z]*)/;
    let wu;
    if (wu = regexp.exec(w)) {
        return { width: wu[1], unit: wu[2] }
    }
}

function throttle(func, wait) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args);
            }, wait);
        }
    }
}

function gesture(ele, { moveFc, endFc }) {
    let isMove = false;
    let startX = 0;
    ele.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
    })
    ele.addEventListener('touchmove', function (e) {
        isMove = true;
        let moveX = e.touches[0].clientX - startX;
        throttle(moveFc, 200);
    })
    ele.addEventListener('touchend', function (e) {
        if (isMove) {
            let endX = e.changedTouches[0].clientX;
            if (endX - startX > 50) {
                endFc.call(this, endX, e);
            }
        }
        startX = 0;
        isMove = false;
    })
}

$(function () {
    const $banner = document.querySelector('.banner');
    const $imgWrapper = $banner.querySelector('ul:first-child');
    const $imgs = $imgWrapper.querySelectorAll('li');
    const $dots = $banner.querySelector('ul:last-child').querySelectorAll('li');
    const imgLen = $imgs.length;
    let index = 1;
    let widthObj = getWidth($imgs[0]);
    const swipe = function () {
        index++;
        let distance = widthObj.width * index;
        $imgWrapper.style.transition = "all .2s ease";
        $imgWrapper.style.transform = `translateX(-${distance}${widthObj.unit})`;
        if (index > imgLen - 2) {
            //最后一张->对应第一张
            $imgWrapper.style.transition = "";
            index = 1;
            $imgWrapper.style.transform = `translateX(-${widthObj.width * index}${widthObj.unit})`;
        } else if (index <= 0) {
            //第一张->对应最后张
            index = imgLen - 2;
            $imgWrapper.style.transition = "";
            $imgWrapper.style.transform = `translateX(-${widthObj.width * index}${widthObj.unit})`;
        }
        $dots.forEach(dot => { dot.classList.remove('now'); })
        $dots[index - 1].classList.add('now');
    };
    let timer = setInterval(swipe, 1000);
    let isMove = false;
    let startX = 0;
    $imgWrapper.addEventListener('touchstart', function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    })
    $imgWrapper.addEventListener('touchmove', function (e) {
        isMove = true;
        let moveX = e.touches[0].clientX - startX;
        let distance = -(index * widthObj.width) + moveX;
        $imgWrapper.style.transform = `translateX(${distance}px)`;
    })
    $imgWrapper.addEventListener('touchend', function (e) {
        if (isMove) {
            let endX = e.changedTouches[0].clientX - startX;
            if (Math.abs(endX) > 50) {
                if (Math.abs(endX) > widthObj.width / 3) {
                    if (endX > 0) {
                        index--;
                    } else {
                        index++;
                    }
                    $imgWrapper.style.transition = 'all .2s ease';
                    $imgWrapper.style.transform = `translateX(-${index * widthObj.width}px)`;
                    if (index <= 0) {
                        index = imgLen -2;
                        $imgWrapper.style.transition = '';
                        $imgWrapper.style.transform = `translateX(-${index * widthObj.width}px)`;
                    } else if (index >= imgLen - 1) {
                        index = 1;
                        $imgWrapper.style.transition = '';
                        $imgWrapper.style.transform = `translateX(-${index * widthObj.width}px)`;
                    }
                    $dots.forEach(dot=>dot.classList.remove('now'));
                    $dots[index-1].classList.add('now');
                }
            }
        }
        startX = 0;
        isMove = false;
        timer = setInterval(swipe, 1000);
    })
});
// render(<Greeter />, document.getElementById("root"));

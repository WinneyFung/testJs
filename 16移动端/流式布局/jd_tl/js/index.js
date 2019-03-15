window.onload = function() {
    const $navLeft = document.querySelector('.nav-l');
    const $navRight = document.querySelector('.nav-r');
    new IScroll($navLeft,{scrollX:false,scrollY:true});
    new IScroll($navRight,{scrollX:false,scrollY:true});
}
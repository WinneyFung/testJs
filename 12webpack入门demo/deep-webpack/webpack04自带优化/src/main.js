let button = document.createElement('button');
button.innerHTML = '点击动态加载js文件';
button.addEventListener('click', function (e) {
    console.log('click')
    import('./a').then(moudle => console.log(moudle.a));
});
document.body.appendChild(button);
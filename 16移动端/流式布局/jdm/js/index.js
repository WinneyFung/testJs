window.onload = function () {
    search();
    banner();
    downtime();
}
const search = function () {
    /**
     *当页面卷曲的高度少于轮播图的高度，透明度随着卷曲的高度逐渐加深（现在透明度/最大透明度=蜷曲高度/轮播图高度）
     * 当页面的卷曲高度大于轮播图高度的时候，透明度固定在0.85
     */
    const $searchBox = document.querySelector('.search_box');
    const $banner = document.querySelector('.banner');
    const bannerHeight = $banner.offsetHeight;
    const searchStyle = window.getComputedStyle($searchBox, null);
    const nowBgc = searchStyle.backgroundColor;
    console.log(nowBgc)
    window.onscroll = function () {
        const scrollTop = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
        if (scrollTop > bannerHeight) {
            if (nowBgc === 'rgba(201, 21, 35, 0.85)') {
                return;
            } else {
                $searchBox.style.backgroundColor = 'rgba(201, 21, 35, .85)';
            }
        } else {
            let opacity = scrollTop / bannerHeight * 0.85;
            $searchBox.style.backgroundColor = `rgba(201, 21, 35, ${opacity})`;
        }
    }
};
const banner = function () {
    /**
     * 1.实现自动播放 过渡 无缝过渡
     * 2.点的索引和轮播图索引一一对应
     * 3.当触摸没有超过1/3，吸住，过渡效果
     * 4.当触摸超过1/3，进入下一个轮播或者上一个轮播
     */
    const $banner = document.querySelector('.banner');
    const $imgBox = $banner.querySelector('ul:first-child');
    const $dotBox = $banner.querySelector('ul:last-child');
    const imgWidth = $banner.offsetWidth;
    let index = 1;
    const imgLen = $imgBox.querySelectorAll('li').length;
    const $dots = $dotBox.querySelectorAll('li');

    function cancelTransition(ele) {
        //取消动画
        $imgBox.style.transition = 'none';
        $imgBox.style.webkitTransition = 'none';
    }

    function addTransition(ele) {
        $imgBox.style.transition = 'all .2s ease';
        $imgBox.style.webkitTransition = 'all .2s ease';
    }

    function slide(distance) {
        $imgBox.style.transform = `translateX(-${distance}px)`;
    }

    function moveDot(i) {
        $dots.forEach(dot => dot.classList.remove('now'));
        if (i >= imgLen - 2 || i < 1) {
            $dots[0].classList.add('now');
        } else {
            $dots[i].classList.add('now');
        }
    }
    let timer = null;

    function addTimer() {
        timer = setInterval(function () {
            index++;
            addTransition($imgBox);
            slide(index * imgWidth);
        }, 1000);
    }
    addTimer();
    $imgBox.addEventListener('transitionend', function () {
        if (index === imgLen - 1) {
            index = 1;
            cancelTransition($imgBox);
            slide(index * imgWidth);
        } else if (index === 0) {
            index = imgLen - 2;
            cancelTransition($imgBox);
            slide(index * imgWidth);
        }
        moveDot(index - 1);
    });

    let startX = 0;
    $imgBox.addEventListener('touchstart', function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });

    $imgBox.addEventListener('touchmove', function (e) {
        let moveX = e.touches[0].clientX;
        /*因为slide函数接受的绝对值 */
        let distance = -imgWidth * index +  moveX - startX;
        addTransition();
        slide(Math.abs(distance));
    });

    $imgBox.addEventListener('touchend', function (e) {
        console.log(e)
        let endX = e.changedTouches[0].clientX;
        const nextDis = (index + 1) * imgWidth;
        const preDis = (index - 1) * imgWidth;
        const moveDis = endX - startX;
        if (Math.abs(endX - startX) > 1 / 3 * imgWidth && moveDis < 0) {
            index++;
            slide(nextDis);
        } else if (Math.abs(endX - startX) > 1 / 3 * imgWidth && moveDis > 0) {
            index--;
            slide(preDis);
        } else {
            slide(index * imgWidth);
        }
        moveDot(index - 1);
        addTimer();
    });

};
const downtime = function () {};
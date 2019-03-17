$(function () {
    initMobileTab();
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
});

const initMobileTab = function () {
    const $tabs = $('.product .nav-tabs');
    let width = 0;
    /**
     * width() :获取的是内容的宽度
     * innerwidth：内边距+内容宽度
     * outerwidth：边框+内边距+内容宽度
     * outerwidth（true）：外边距+边框+内边距+内容的宽度
     */
    $tabs.find('li').each((i, li) => {
        $li = $(li);
        width += $li.outerWidth(true);
    });
    $tabs.width(width);

    new IScroll(document.querySelector('.product .tab-parent'), {
        scrollX: true, scrollY: false,
        click: true
    });
}
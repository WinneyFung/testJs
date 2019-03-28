if (ENV == 'production') {
    console.log('生产环境');
    console.log(IS_EXPRESSION, IS_DEV);
    console.log(typeof IS_EXPRESSION, typeof IS_DEV);
} else if (ENV == 'dev') {
    console.log('开发环境');
}
//node开发服务的阻塞情况
//平台是v8引擎 对es6的支持情况是：根本不支持  ，直接支持，严格模式支持
`use strict`;
const http = require('http');
let count = 0;
const server = http.createServer((req, res) => {
    //此回调会在有任何用户请求时触发 chrome刷新一次就增加2的原因时，除了发送一次页面请求外，也发送了一个请求favicon
    console.log(`get request: ${req.url}`);
    count++;
    //如果在这里设置死循环 其他请求也会被阻塞  可以看出时单线程的
/*     if (count >= 10) {
        while (true) {

        }
    } */
    res.write(`you are the ${count} `, 'utf8');
    res.end();
});
server.listen(8080, error => {
    if (error) {
        throw error;
    }
    console.log('成功启动web服务，端口:', 8080);
});
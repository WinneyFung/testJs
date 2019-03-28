/**
 * 异步串行程序
 */
class AsyncSeriesHook {
    constructor() {
        this.tasks = [];
    }

    asyncTap(name, task) {
        this.tasks.push(task);
    }

    asyncCall(...args) {
        //串行执行函数  并且绑定task的时候，task函数体里面会自动调回调函数
        //关键是如何求出回调函数
        let doneCb = args.pop();
        let idx = 0;
        let next = () => {
            if (idx >= this.tasks.length) { return doneCb(); }
            let task = this.tasks[idx++];
            task(...args, next);
        }
        next();
    }
}

let hook = new AsyncSeriesHook();
hook.asyncTap('react', function (name, done) {
    setTimeout(() => {
        console.log('react', name);
        done();
    }, 3000)
});
hook.asyncTap('vue', function (name, done) {
    setTimeout(() => {
        console.log('vue', name);
        done();
    }, 1000)
});
hook.asyncTap('angular', function (name, done) {
    setTimeout(() => {
        console.log('angular', name);
        done();
    }, 500)
});

hook.asyncCall('winney', function () { console.log('end') });
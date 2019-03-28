/**
 * 异步串行程序，上一次函数调用的cb会给下一个函数传入参数，第一个error，第二是第下一个函数的入参
 */
class AsyncSeriesWaterfallHook {
    constructor() {
        this.tasks = [];
    }

    asyncTap(name, task) {
        this.tasks.push(task);
    }

    asyncCall(...args) {
        //串行执行函数  并且绑定task的时候，task函数体里面会自动调回调函数
        //关键是如何定义回调函数
        let doneCb = args.pop();
        let idx = 0;
        let next = (error, data) => {
            if (idx >= this.tasks.length) { return doneCb(); }
            let task = this.tasks[idx];
            if (idx === 0) {
                task(...args, next);
            } else {
                task(data, next);
            }
            idx++;
        }
        next();
    }
}

let hook = new AsyncSeriesWaterfallHook();
hook.asyncTap('react', function (name, done) {
    setTimeout(() => {
        console.log('react', name);
        done(null, 'cause react done');
    }, 3000)
});
hook.asyncTap('vue', function (name, done) {
    setTimeout(() => {
        console.log('vue', name);
        done(null, 'cause vue done');
    }, 1000)
});
hook.asyncTap('angular', function (name, done) {
    setTimeout(() => {
        console.log('angular', name);
        done();
    }, 500)
});

hook.asyncCall('winney', function () { console.log('end') });
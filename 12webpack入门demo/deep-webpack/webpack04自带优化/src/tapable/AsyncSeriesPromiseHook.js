
class AsyncSeriesPromiseHook {
    constructor() {
        this.tasks = [];
    }

    tapPromise(name, task) {
        this.tasks.push(task);
    }

    promise(...args) {
        //串行执行promise
        let [fir, ...others] = this.tasks;
        return others.reduce((p, nextTask) => {
            return p.then(() => nextTask(...args));
        }, fir(...args));
    }
}

let hook = new AsyncSeriesPromiseHook();
hook.tapPromise('react', function (name) {
    return new Promise((resolve, reject) => {
        console.log('react', name);
        resolve();
    });
});
hook.tapPromise('vue', function (name) {
    return new Promise((resolve, reject) => {
        console.log('vue', name);
        resolve();
        // reject();
    });
});

hook.tapPromise('angular', function (name) {
    return new Promise((resolve, reject) => {
        console.log('angular', name);
        resolve();
    });
});

hook.promise('winney').then(() => {
    console.log('end');
}).catch(() => {
    console.log('excepion,end....');
});
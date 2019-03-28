
class AsyncParrallePromiseHook {
    constructor() {
        this.tasks = [];
    }

    tapPromise(name, task) {
        this.tasks.push(task);
    }

    promise(...args) {
        //tasks数组里面都是一个个promise对象
        let tasks = this.tasks.map(task => task(...args));
        //将所有的promise的状态变为一个promise，只要tasks里面的promise一个为rejected状态，那么就为rejected
        return Promise.all(tasks);
    }
}

let hook = new AsyncParrallePromiseHook();
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
}).catch(()=>{
    console.log('excepion,end....');
});
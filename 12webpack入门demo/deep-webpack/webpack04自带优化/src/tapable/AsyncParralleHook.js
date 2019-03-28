class AsyncParralleHook {
    constructor() {
        this.tasks = [];
    }

    asyncTap(name, task) {
        this.tasks.push(task);
    }

    asyncCall(...args) {
        const cb = args.pop();
        let doneMount = 0
        let done = () => {
            doneMount++;
            if (doneMount >= this.tasks.length) {
                cb();
            }
        }
        this.tasks.forEach(task => { task(...args, done); });
    }
}

let hook = new AsyncParralleHook();
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
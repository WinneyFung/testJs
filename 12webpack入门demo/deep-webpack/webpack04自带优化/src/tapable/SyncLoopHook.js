class SyncLoopHook {
    constructor() {
        this.tasks = [];
    }

    tap(name, task) {
        this.tasks.push(task);
    }

    call(...args) {
        this.tasks.forEach(task => {
            let ret;
            do {
                ret = task(...args);
            } while (!ret);

        })
    }
}

let hook = new SyncLoopHook();
hook.tap('react', (function () {
    let idx = 0
    return function (name) {
        console.log('react', name);
        idx++;
        return idx >= 3 ? 'react ok' : undefined;
    }
})());
hook.tap('angular', function (name) {
    console.log('angular', name);
    return 'angular ok'
});
hook.tap('vue', function (name) {
    console.log('vue', name);
    return true;
});
hook.call('winney fung');
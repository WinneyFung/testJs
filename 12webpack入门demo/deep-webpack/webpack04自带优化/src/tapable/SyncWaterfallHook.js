class SyncWaterfallHook {
    constructor() {
        this.tasks = [];
    }

    tap(name, task) {
        this.tasks.push(task);
    }

    call(...args) {
        const [firstTask, ...restTasks] = this.tasks;
        const firReturn = firstTask(args);
        restTasks.reduce((preReturn, task) => { console.log(preReturn); return task(...args) }, firReturn)
    }
}

let baiHook = new SyncWaterfallHook();
baiHook.tap('react', function (name) {
    console.log('react', name);
    return 'react ok'
});
baiHook.tap('angular', function (name) {
    console.log('angular', name);
    return 'angular ok'
});
baiHook.tap('vue', function (name) {
    console.log('vue', name);
});
baiHook.tap('jquery', function (name) {
    console.log('jquery', name);
    return '这里要停止。。。'
});
baiHook.call('winney');
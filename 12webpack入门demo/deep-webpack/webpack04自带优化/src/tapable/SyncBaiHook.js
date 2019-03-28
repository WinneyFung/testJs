class SyncBaiHook {
    constructor() {
        this.tasks = [];
    }

    tap(name, task) {
        this.tasks.push(task);
    }

    call(...args) {
        // this.tasks.forEach(task => task(...args));
        let idx = 0;
        let prevReturn;
        do {
            prevReturn = this.tasks[idx++](...args);
        } while (prevReturn === undefined && idx < this.tasks.length);
    }
}

let baiHook = new SyncBaiHook();
baiHook.tap('react', function (name) {
    console.log('react', name);
});
baiHook.tap('angular', function (name) {
    console.log('react', name);
});
baiHook.tap('jquery', function (name) {
    console.log('jquery', name);
    return '这里要停止。。。'
});
baiHook.tap('vue', function (name) {
    console.log('vue', name);
});
baiHook.call('winney');
function* get() {
    yield 1;
    yield 3;
}

const gen = get();
console.log(gen.next())
console.log(gen.next());
console.log('aaa'.includes('a'));
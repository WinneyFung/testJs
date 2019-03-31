class ConsolePlugin {
    apply(compiler) {
        compiler.hooks.entryOptions.tap('console-plugin', () => {
            console.log('entryOptions...');
        });
        compiler.hooks.emit.tap('console-plugin', () => {
            console.log('emit...');
        });
    }
}

module.exports = ConsolePlugin;
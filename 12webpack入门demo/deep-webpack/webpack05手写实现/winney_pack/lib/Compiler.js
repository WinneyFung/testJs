const path = require('path');
const process = require('process');
const fs = require('fs');
//引入ast分析依赖 https://astexplorer.net/
const babylon = require('babylon');
const t = require('@babel/types');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const ejs = require('ejs');
const fileUtils = require('./FileUtils');
const { SyncHook } = require('tapable');
//tapable 订阅发布
class Compiler {
    constructor(config) {
        this.config = config;
        //需要保存入口文件路径  entry output
        this.entryId = '';
        //保存所有入口文件依赖
        this.modules = {};
        //入口路径
        this.entry = config.entry;
        //工作路径
        this.root = process.cwd()
        //添加钩子函数（发布订阅）
        this.hooks = {
            entryOptions: new SyncHook(),
            compile: new SyncHook(),
            afterCompiler: new SyncHook(),
            afterPlugins: new SyncHook(),
            run: new SyncHook(),
            emit: new SyncHook(),
            done: new SyncHook()
        }
        let plugins = this.config.plugins;
        if (Array.isArray(plugins)) {
            plugins.forEach(plugin => {
                plugin.apply(this);
            });
        }
        this.hooks.afterPlugins.call();
    }

    /**
     * 根据模块路径获取文件内容
     * @param {*} modulePath 
     */
    getSource(modulePath) {
        let content = fs.readFileSync(modulePath, 'utf-8');
        //获取所有的loader
        const rules = this.config.module.rules;
        rules.forEach(rule => {
            if (rule.test.test(modulePath)) {
                const uses = rule.use;
                const usesLen = uses.length;
                for (let i = usesLen - 1; i >= 0; i--) {
                    const loader = require(uses[i]);
                    content = loader(content);
                }
            }
        });
        return content;
    }

    parse(source, parentDir) {
        let ast = babylon.parse(source);
        let dependencies = [];
        traverse(ast, {
            CallExpression(p) {
                let node = p.node;
                if (node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__';
                    let moduleName = node.arguments[0].value;
                    // moduleName = moduleName + path.extname(moduleName)?'':'.js';
                    moduleName = './' + path.join(parentDir, moduleName);
                    dependencies.push(moduleName);
                    node.arguments = [t.stringLiteral(moduleName)]
                }
            }
        });
        let sourceCode = generator(ast).code;
        //递归查找其他依赖
        dependencies.forEach(dep => {
            this.buildModule(path.join(this.root, dep), false)
        })
        return { sourceCode, dependencies };
    }

    run() {
        this.hooks.run.call();
        this.hooks.compile.call();
        //执行 并且创建模块的依赖关系
        this.buildModule(path.resolve(this.root, this.entry), true);
        this.hooks.afterCompiler.call();
        //发射一个文件  打包后的文件
        this.emitFile();
        this.hooks.emit.call();
    }

    /**
     * 构建模块间的依赖关系
     * @param {*} modulePath 
     * @param {*} isEntry 是否为入口文件
     */
    buildModule(modulePath, isEntry) {
        let source = this.getSource(modulePath);
        //获取相对路径名称   modulePath-this.root
        let moduleName = './' + path.relative(this.root, modulePath);
        if (isEntry) {
            this.entryId = moduleName;
        }
        //将source的源代码进行改造，比如使用import语法 required语法引入的改造下 返回这个模块之间的依赖关系关系 以及改造后的源代码
        let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName));
        //构建模块间的相互依赖关系 将相对路径以及源代码对应起来
        this.modules[moduleName] = sourceCode;
    }

    emitFile() {
        let output = path.join(this.config.output.path, this.config.output.filename);
        let templateStr = this.getSource(path.join(__dirname, '../main.ejs'));
        const { entryId, modules } = this;
        let code = ejs.render(templateStr, { entryId, modules });
        this.assets = {};
        this.assets[output] = code;
        fileUtils.write2Output(output, this.assets[output]);
    }

}

module.exports = Compiler;
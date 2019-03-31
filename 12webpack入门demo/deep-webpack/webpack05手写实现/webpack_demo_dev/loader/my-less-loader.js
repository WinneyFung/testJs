const less = require('less');
function loader(source) {
    let css = '';
    less.render(source, function (err, c) {
        css = c.css;
    });
    css = css.replace(/\n/g, '\\n');
    css = css.replace(/\"/g, '\\"');
    return css;
}

module.exports = loader;
const fs = require('fs');
const path = require('path');
module.exports = {
    mkdir(dirpath, dirparent) {
        if (dirparent === undefined) {
            if (fs.existsSync(dirpath)) {
                return;
            } else {
                this.mkdir(dirpath, path.dirname(dirpath));
            }
        } else {
            if (fs.existsSync(dirparent)) {
                fs.mkdirSync(dirpath);
            } else {
                this.mkdir(dirparent, path.dirname(dirparent));
                fs.mkdirSync(dirpath);
            }
        }
    },
    /**
     * 输出文件
     */
    write2Output(output, content) {
        let lIndx = output.lastIndexOf('\\');
        let filename = output.substr(lIndx);
        output = output.substr(0, lIndx);
        this.mkdir(output);
        fs.writeFileSync(output + '\\' + filename, content);
    }
}
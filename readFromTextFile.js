var exports = module.exports = {};

exports.readTextFile = function(file) {
    const fs = require('fs');
    const text = fs.readFileSync(file);
    const textFile = text.toString().split('\r\n');
    return textFile;
}

//  Провести code-review  + переписать на es6
const fs = require("fs");

function getFile(path) {
    let result;

    fs.readFile(path, function (err, data) {
        if (err) {
            throw new Error(err);
        }

        result = data;
    });
    return result;
}

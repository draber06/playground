//  Провести code-review  + переписать на es6
import fs from "fs";

function getFileModern(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

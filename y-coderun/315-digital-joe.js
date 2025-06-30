"use strict";

(global => {
    const timeout = 20;

    const _async = (fn, cb) => {
        setTimeout(() => {
            cb(fn());
        }, Math.random() * timeout);
    };

    const Folder = function (a = []) {
        if (!new.target) {
            return new Folder(a);
        }

        this.read = (index, cb) => _async(() => a[index], cb);
        this.size = cb => _async(() => a.length, cb);
    };

    Object.freeze(Folder);
    global.Folder = Folder;
})(typeof window === "undefined" ? global : window);

const input = Folder([
    "file",
    "ffffile",
    Folder(["file"]),
    Folder(["fiiile"]),
    Folder([{}, null, "file", "ffiillee", "ffiillee"]),
    Folder([Folder(["filllle", "file", null]), {}, Folder([])]),
]);

function isFilenameCorrupted(filename) {
    for (let i = 0; i < filename.length - 1; i++) {
        if (filename[i] === filename[i + 1]) {
            return true;
        }
    }

    return false;
}

// проверка решения
solution(input).then(result => {
    const answer = ["ffffile", "ffiillee", "ffiillee", "fiiile", "filllle"];

    const isEqual = String(answer) === String(result);

    if (isEqual) {
        console.log("OK");
    } else {
        console.log("WRONG");
    }
});

async function solution(input) {
    function traverseFileSystem(folder) {
        return new Promise(resolve => {
            folder.size(size => {
                const tasks = [];
                let i = 0;
                while (i < size) {
                    tasks.push(
                        new Promise(resolve => {
                            folder.read(i, file => {
                                if (typeof file === "string") {
                                    resolve(isFilenameCorrupted(file) ? file : []);
                                } else if (
                                    file !== null &&
                                    typeof file === "object" &&
                                    typeof file.read === "function"
                                ) {
                                    resolve(traverseFileSystem(file));
                                } else {
                                    resolve([]);
                                }
                            });
                        })
                    );
                    i++;
                }
                resolve(Promise.all(tasks).then(res => res.flat()));
            });
        });
    }

    const corruptedFiles = await traverseFileSystem(input);

    return corruptedFiles.sort();
}

async function solutionGptVerstion(input) {
    function getSize(folder) {
        return new Promise(resolve => folder.size(resolve));
    }

    function readFile(folder, index) {
        return new Promise(resolve => folder.read(index, resolve));
    }

    async function traverseFileSystem(folder) {
        const size = await getSize(folder);
        const tasks = [];

        for (let i = 0; i < size; i++) {
            tasks.push(
                readFile(folder, i).then(file => {
                    if (typeof file === "string") {
                        return isFilenameCorrupted(file) ? [file] : [];
                    } else if (
                        file !== null &&
                        typeof file === "object" &&
                        typeof file.read === "function"
                    ) {
                        return solution(file);
                    }
                    return [];
                })
            );
        }
        const results = await Promise.all(tasks);
        return results.flat();
    }

    const corruptedFiles = await traverseFileSystem(input);

    return corruptedFiles.sort();
}

async function solutionIterative(input) {
    function getSize(folder) {
        return new Promise(resolve => folder.size(resolve));
    }

    function readFile(folder, index) {
        return new Promise(resolve => folder.read(index, resolve));
    }

    const corruptedFiles = [];
    const foldersToProcess = [input];

    while (foldersToProcess.length > 0) {
        const folder = foldersToProcess.pop();
        const n = await getSize(folder);

        const tasks = Array.from({ length: n }, (_, i) => readFile(folder, i));

        const files = await Promise.all(tasks);

        for (const file of files) {
            if (typeof file === "string") {
                if (isFilenameCorrupted(file)) {
                    corruptedFiles.push(file);
                }
            } else if (
                file !== null &&
                typeof file === "object" &&
                typeof file.read === "function"
            ) {
                foldersToProcess.push(file);
            }
        }
    }

    return corruptedFiles.sort();
}

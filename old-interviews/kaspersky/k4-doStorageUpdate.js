import assert from "assert";

const list = [
    () =>
        new Promise(resolve => {
            setTimeout(() => resolve("1"), 1000);
        }),
    () =>
        new Promise(resolve => {
            setTimeout(() => resolve("2"));
        }),
    () =>
        new Promise(resolve => {
            setTimeout(() => resolve("3"), 500);
        }),
];

function doStorageUpdate1(storage, data) {
    let result = Promise.resolve();

    for (const op of list) {
        result = result.then(() => op(storage, data));
    }

    return result;
}

function doStorageUpdate2(storage, data) {
    return list.reduce((acc, op) => acc.then(() => op(storage, data)), Promise.resolve());
}

async function doStorageUpdate3(storage, data) {
    for (const op of list) {
        await op(storage, data);
    }
}

doStorageUpdate({}, {});

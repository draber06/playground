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

// function doStorageUpdate(storage, data) {
//     let current = Promise.resolve();
//
//     for (let i = 0; i < list.length; i++) {
//         const operation = list[i];
//         current = current.then(() => operation(storage, data));
//     }
//
//     return current;
// }

async function doStorageUpdate(storage, data) {
    for (const fn of list) {
        await fn(storage, data);
    }
}

doStorageUpdate({}, {});

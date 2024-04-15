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

async function doStorageUpdate(storage, data) {
    let task = Promise.resolve();

    for (const operation of list) {
        task = task
            .then(() => operation(storage, data))
            .then(res => console.log(`Logging results of operation: ${res}`));
    }
}

doStorageUpdate({}, {});

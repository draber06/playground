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
    return list.reduce((prev, op) => prev.then(() => op(storage, data)), Promise.resolve());
}

doStorageUpdate({}, {});

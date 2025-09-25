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

function doStorageUpdate(storage, data) {}

doStorageUpdate({}, {});

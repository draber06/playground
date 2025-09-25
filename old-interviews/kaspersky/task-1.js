// Как получить все ключи?
const obj = {
    name: "Undefiend",
    age: 16,
};

const keys1 = Object.keys(obj);
const [keys2] = Object.entries(obj);
const keys3 = Object.getOwnPropertyNames(obj);

const keys4 = [];

for (let k in obj) {
    if (Object.hasOwn(obj, k)) {
        keys4.push(k);
    }
}

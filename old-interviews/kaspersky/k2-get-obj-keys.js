const obj = {
    name: "Undefiend",
    age: 16,
};

// Как получить все ключи?
const keys = Object.keys(obj);
const keys2 = Object.getOwnPropertyNames(obj);

const keys3 = [];
for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
        keys3.push(key);
    }
}

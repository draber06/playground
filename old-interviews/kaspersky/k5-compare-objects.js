import assert from "assert";

/* eslint-disable */
// Нужно написать функцию isEqual, которая сравнивает объекты
// tip: пример объектов, функция должа обрабатывать объекты любой структуры
// tip: точно известно, что порядок следования свойств не будет меняться
// tip: объект может содержать примитивы, объекты, массивы

const redCar = {
    wheels: 4,
    brake: 4,
    speed: 180,
    options: [
        { optionKey: "123-234-345", optionName: "color" },
        { optionKey: "234-345-987", optionName: "warranty" },
    ],
}; // reference

const yellowCar = {
    wheels: 3,
    brake: 2,
    speed: 70,
    options: [
        { optionKey: "665-232-345", optionName: "isBroken" },
        { optionKey: "234-345-987", optionName: "warranty" },
    ],
}; // false

const blueCar = {
    wheels: 4,
    brake: 4,
    speed: 180,
    options: [
        { optionKey: "123-234-345", optionName: "isBroken" },
        { optionKey: "234-345-987", optionName: "warranty" },
    ],
}; // false

const greenCar = {
    wheels: 4,
    brake: 4,
    speed: 180,
    options: [
        { optionKey: "123-234-345", optionName: "color" },
        { optionKey: "234-345-987", optionName: "warranty" },
    ],
}; // true

// Time - O(n)
// Space - O(d)
function isEqual(obj1, obj2) {
    if (obj1 === obj2) return true;

    if (obj1 === null || obj2 === null) return false;

    if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;

    if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!Object.hasOwn(obj2, key)) return false;

        if (!isEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

function isEqualIterative(obj1, obj2) {
    const stack = [[obj1, obj2]];

    while (stack.length) {
        const [v1, v2] = stack.pop();

        if (v1 === v2) continue;

        if (v1 === null || v2 === null) return false;

        if (typeof v1 !== "object" || typeof v2 !== "object") return false;

        if (Array.isArray(v1) !== Array.isArray(v2)) return false;

        const keys1 = Object.keys(v1);
        const keys2 = Object.keys(v2);
        if (keys1.length !== keys2.length) return false;

        for (const key of keys1) {
            if (!Object.hasOwn(v2, key)) return false;
            stack.push([v1[key], v2[key]]);
        }
    }

    return true;
}

assert.equal(isEqualIterative(redCar, greenCar), true);
assert.equal(isEqualIterative(redCar, yellowCar), false);
assert.equal(isEqualIterative(redCar, blueCar), false);
assert.equal(isEqualIterative(redCar, greenCar), true);

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

function isEqual(obj1, obj2) {
    if (obj1 === obj2) return true;

    if (
        typeof obj1 !== "object" ||
        typeof obj2 !== "object" ||
        typeof obj === null ||
        typeof obj2 === null
    )
        return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!Object.hasOwn(obj2, key)) return false;
        if (!isEqual(obj1[key], obj2[key])) return false;
    }

    return true;
}

assert.equal(isEqual(redCar, greenCar), true);
assert.equal(isEqual(redCar, yellowCar), false);
assert.equal(isEqual(redCar, blueCar), false);
assert.equal(isEqual(redCar, greenCar), true);

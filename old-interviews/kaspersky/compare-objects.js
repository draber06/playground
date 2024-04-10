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

// 1. если количество ключей не равно то объекты не равны
// 2. если примитив сравниваем строго по значению ===
// 3. если массив то, длинна должны быть равна,  если примитив сравниваем строго по значению ===,

function isEqual(obj1, obj2) {
    for (const key in obj1) {
        if (!Object.hasOwn(obj2, key)) {
            return false;
        }

        const v1 = obj1[key];
        const v2 = obj2[key];
        if (Array.isArray(v1) && Array.isArray(v2)) {
            if (v1.length !== v2.length) {
                return false;
            }

            return isEqual(v1, v2);
        }

        if (
            typeof obj1[key] === "object" &&
            obj1[key] !== null &&
            typeof obj2[key] === "object" &&
            obj2[key] !== null
        ) {
            return isEqual(v1, v2);
        }

        if (v1 !== v2) return false;
    }

    return true;
}

assert.equal(isEqual(redCar, greenCar), true);
assert.equal(isEqual(redCar, yellowCar), false);
assert.equal(isEqual(redCar, blueCar), false);
assert.equal(isEqual(redCar, greenCar), true);

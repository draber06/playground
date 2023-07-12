import assert from "assert";

function isEqual(obj1, obj2) {
    const obj1Keys = Object.keys(obj1);
    if (obj1Keys.length !== Object.keys(obj2).length) {
        return false;
    }

    return obj1Keys.every((k) => {
        if (!Object.prototype.hasOwnProperty.call(obj2, k)) {
            return false;
        }

        if (Array.isArray(obj1[k]) && Array.isArray(obj2[k])) {
            if (obj1[k].length !== obj2[k].length) {
                return false;
            }

            return obj1[k].every((v, index) => isEqual(v, obj2[k][index]));
        }

        if (
            typeof obj1[k] === "object" &&
            obj1[k] !== null &&
            typeof obj2[k] === "object" &&
            obj2[k] !== null
        ) {
            return isEqual(obj1[k], obj2[k]);
        }

        return obj1[k] === obj2[k];
    });
}

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

assert.equal(isEqual(redCar, yellowCar), false);
assert.equal(isEqual(redCar, blueCar), false);
assert.equal(isEqual(redCar, greenCar), true);

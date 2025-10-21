import assert from "assert";

function maxGuests(guests) {
    const arrivals = guests.map(g => g[0]).sort((a, b) => a - b);
    const departures = guests.map(g => g[1]).sort((a, b) => a - b);

    let i = 0;
    let j = 0;
    let current = 0;
    let max = 0;

    while (i < arrivals.length && j < departures.length) {
        if (arrivals[i] < departures[j]) {
            current++;
            if (current > max) max = current;
            i++;
        } else {
            current--;
            j++;
        }
    }

    return max;
}

function maxGuestsSecond(guests) {
    let events = [];

    for (let [checkIn, checkOut] of guests) {
        events.push([checkIn, +1]); // заезд = +1
        events.push([checkOut, -1]); // отъезд = -1
    }

    events.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

    let current = 0; // текущее число гостей
    let max = 0; // максимальное значение
    console.log("-----", "events", events);

    for (let [date, change] of events) {
        current += change; // применяем изменение
        if (current > max) max = current;
    }

    return max;
}

// 0,1,1,2,10
// 2,2,2,3,11
// 0 < 2 -> current = 1 -> max = 1 -> i = 1, j = 0
// 1 < 2 -> current = 2 -> max = 2 -> i = 2, j = 0
// 1 < 2 -> current = 3 -> max = 3 -> i = 3, j = 0
// 2 == 2 -> current = 2 -> max = 3 -> i = 3, j = 1
// 2 == 2 -> current = 1 -> max = 3 -> i = 3, j = 2
// 2 == 3 -> current = 0 -> max = 3 -> i = 3, j = 3
// 2 < 3 -> current = 1 -> max = 3 -> i = 4, j = 3
// 10 > 3 -> current = 0 -> max = 3 -> i = 4, j = 4
// 10 < 11 -> current = 1 -> max = 3 -> i = 5, j = 4
assert.deepEqual(
    maxGuestsSecond([
        [1, 2],
        [0, 2],
        [1, 2],
        [2, 3],
        [10, 11],
    ]),
    3
);

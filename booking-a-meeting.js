import assert from "assert";
import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";

// Input
// 3
// 1 3
// 2 3
// 4 5
// Answer - 2

// Input
// 5
// 1 2
// 2 3
// 4 5
// 4 5
// 5 6
// Answer - 2

// Input
// 2
// 1 50
// 49 50
// Answer - 1

// Бронирование переговорки
// Задано  n интервалов. Требуется найти максимальное количество взаимно непересекающихся интервалов.

function bookingMeeting(intervals) {
    let result = 0;
    let currentIntervals = intervals.slice();
    let minR = Number.POSITIVE_INFINITY;

    while (currentIntervals.length > 0) {
        for (const [, r] of currentIntervals) {
            minR = Math.min(r, minR);
        }

        result++;
        currentIntervals = currentIntervals.filter(([start]) => start > minR);
        minR = Number.POSITIVE_INFINITY;
    }

    return result;
}

const rl = readline.createInterface({
    input,
    output,
});

const intervals = [];
let currentLine = 0;

rl.on("line", line => {
    if (currentLine > 0) {
        intervals.push(line.trim().split(" ").map(Number));
    }
    currentLine++;
});

rl.on("close", () => {
    bookingMeeting(intervals);
});

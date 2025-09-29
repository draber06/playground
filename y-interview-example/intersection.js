import assert from "assert";

function intersection(schedule1, schedule2) {
    let i = 0;
    let j = 0;
    // Space - O(m + n))
    const result = [];

    // Time
    // Big O - (m + n)
    // Big Omega (m + n)
    // Big Theta - O(m + n)
    while (i < schedule1.length && j < schedule2.length) {
        const [l1, r1] = schedule1[i];
        const [l2, r2] = schedule2[j];

        const r = Math.min(r1, r2);
        const l = Math.max(l1, l2);

        if (l < r) {
            result.push([l, r]);
        }
        if (r1 < r2) {
            i++;
        } else {
            j++;
        }
    }

    return result;
}

assert.deepEqual(
    intersection(
        [
            [8, 12],
            [17, 22],
        ],
        [
            [5, 11],
            [14, 18],
            [20, 23],
        ]
    ),
    [
        [8, 11],
        [17, 18],
        [20, 22],
    ]
);

assert.deepEqual(
    intersection(
        [
            [10, 14],
            [21, 24],
        ],
        [
            [9, 15],
            [18, 21],
            [22, 24],
        ]
    ),
    [
        [10, 14],
        [22, 24],
    ]
);

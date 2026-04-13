import assert from "assert";

function getRoute(tickets = []) {
    return [];
}

assert.deepEqual(
    getRoute([
        { from: "London", to: "Moscow" },
        { from: "NY", to: "London" },
        { from: "Moscow", to: "SPb" },
    ]),
    [
        { from: "NY", to: "London" },
        { from: "London", to: "Moscow" },
        { from: "Moscow", to: "SPb" },
    ]
);

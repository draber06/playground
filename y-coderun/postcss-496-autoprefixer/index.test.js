const postcss = require("postcss");
const { equal } = require("node:assert");
const { test } = require("node:test");

const plugin = require("./");

async function run(input, output, opts = {}) {
    let result = await postcss([plugin(opts)]).process(input, { from: undefined });

    equal(result.css, output);
    equal(result.warnings().length, 0);
}

//
// .card {
//     align-items: center;
//     display: flex;
//     padding: 16px;
//     border-radius: 10px;
// }
//
// .secondary,
//     input::placeholder {
//     color: #888;
// }

// .card {
//     -webkit-display: flex;
//     -moz-display: flex;
//     display: flex;
//     align-items: center;
//     padding: 16px;
//     -webkit-border-radius: 10px;
//     -moz-border-radius: 10px;
//     -ms-border-radius: 10px;
//     -o-border-radius: 10px;
//     border-radius: 10px;
// }
//
// input::-ms-input-placeholder {
//     color: #888;
// }
//
// input::-moz-placeholder {
//     color: #888;
// }
//
// .secondary,
//     input::placeholder {
//     color: #888;
// }

test("adds vendor prefixes", async () => {
    await run(
        ".card { display: flex; align-items: center; padding: 16px; border-radius: 10px; } .secondary, input::placeholder { color: #888; }",
        ".card { -webkit-display: flex; -moz-display: flex; display: flex; align-items: center; padding: 16px; -webkit-border-radius: 10px; -moz-border-radius: 10px; -ms-border-radius: 10px; -o-border-radius: 10px; border-radius: 10px; } input::-ms-input-placeholder { color: #888; } input::-moz-placeholder { color: #888; } .secondary, input::placeholder { color: #888; }",
        {
            vendorPrefixes: {
                display: ["webkit", "moz"],
                "border-radius": ["webkit", "moz", "ms", "o"],
                "::placeholder": ["ms-input", "moz"],
            },
        }
    );
});

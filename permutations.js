import assert from "assert";

const swapInPlace = (arrToSwap, indexA, indexB) => {
    [arrToSwap[indexA], arrToSwap[indexB]] = [arrToSwap[indexB], arrToSwap[indexA]];
};

const getPermutations = arr => {
    const output = [];

    const generate = (n, heapArr) => {
        if (n === 1) {
            output.push(heapArr.slice());
            return;
        }

        generate(n - 1, heapArr);

        for (let i = 0; i < n - 1; i++) {
            if (n % 2 === 0) {
                swapInPlace(heapArr, i, n - 1);
            } else {
                swapInPlace(heapArr, 0, n - 1);
            }

            generate(n - 1, heapArr);
        }
    };

    generate(arr.length, arr.slice());

    console.log(output);
    return output;
};

function countPermutationsHeapAlgorithm(n) {
    const range = Array.from(Array(n), (_, i) => i + 1);

    return getPermutations(range);
}

// assert.equal(countPermutationsHeapAlgorithm(3).length, 6);
assert.equal(countPermutationsHeapAlgorithm(4).length, 24);

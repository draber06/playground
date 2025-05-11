const a = [0, 0, 0];
const b = [10, 2, 1];

function generatePermutations(a, b) {
    const result = [];

    function backtrack(index, current) {
        if (index === a.length) {
            result.push([...current]);
            return;
        }

        for (let i = a[index]; i <= b[index]; i++) {
            current.push(i);
            backtrack(index + 1, current);
            current.pop();
        }
    }

    backtrack(0, []);
    return result;
}

const permutations = generatePermutations(a, b);
console.log(permutations); // Array of arrays
console.log(`Total permutations: ${permutations.length}`);

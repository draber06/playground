import readline from "readline";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const inputLines = [];

rl.on("line", line => {
    inputLines.push(line.trim());
    if (inputLines.length === 2) {
        rl.close();
    }
});

rl.on("close", () => {
    const n = Number(inputLines[0]);
    const nums = inputLines[1].split(" ").map(Number);
    mergeSort(nums, 0, n - 1);

    console.log(...nums);
});

/*
    Inversions

    d) Give an algorithm that determines the number of inversions in any permutation
    on n elements in n lg n worst-case time. (Hint: Modify merge sort.)
    Inversion pair
    If i < j and A[i] > A[j]
*/

function merge(arr, p, q, r) {
    const left = arr.slice(p, q + 1);
    const right = arr.slice(q + 1, r + 1);

    let i = 0;
    let j = 0;
    let k = p;
    let inversion_count = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            inversion_count += left.length - i;
            arr[k] = right[j];
            j++;
        }
        k++;
    }

    while (i < left.length) {
        arr[k] = left[i];
        i++;
        k++;
    }
    while (j < right.length) {
        arr[k] = right[j];
        j++;
        k++;
    }

    return inversion_count;
}

function mergeSort(arr, p, r, k = Math.log2(arr.length)) {
    if (p >= r) {
        return;
    }

    const q = Math.floor((p + r) / 2);
    mergeSort(arr, p, q, k);
    mergeSort(arr, q + 1, r, k);
    merge(arr, p, q, r);
}

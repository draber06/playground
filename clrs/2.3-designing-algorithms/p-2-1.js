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

function merge(arr, p, q, r) {
    const left = arr.slice(p, q + 1);
    const right = arr.slice(q + 1, r + 1);

    let i = 0;
    let j = 0;
    let k = p;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
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
}

// O(n^2)
function insertionSort(arr, l, r) {
    for (let i = l + 1; i <= r; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= l && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

function mergeSort(arr, p, r, k = Math.log2(arr.length)) {
    if (p >= r) {
        return;
    }

    if (r - p + 1 < k) {
        insertionSort(arr, p, r);
    } else {
        const q = Math.floor((p + r) / 2);
        mergeSort(arr, p, q);
        mergeSort(arr, q + 1, r);
        merge(arr, p, q, r);
    }
}

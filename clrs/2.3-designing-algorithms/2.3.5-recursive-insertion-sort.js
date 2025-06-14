let inputData = "";

process.stdin.setEncoding("utf-8");

process.stdin.on("data", chunk => {
    inputData += chunk;
});

process.stdin.on("end", () => {
    const lines = inputData
        .trim()
        .split("\n")
        .map(line => line.trim());

    const nums = lines[1].split(" ").map(Number);
    recursiveInsertionSort(nums);
    console.log(...nums);
});

function recursiveInsertionSort(arr, i = 2) {
    if (i >= arr.length) return;

    const x = arr[i];
    let j = i - 1;
    while (j > 0 && x < arr[j]) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = x;

    return recursiveInsertionSort(i + 1);
}

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
    const x = Number(lines[2]);
    console.log(hasSum(nums, x));
});

function hasSum(arr, x) {
    arr.sort((a, b) => a - b); // O(n*lg(n)

    let left = 0;
    let right = arr.length - 1;

    // O(n);
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === x) {
            return true;
        } else if (sum < x) {
            left++;
        } else {
            right--;
        }
    }

    return false;
}

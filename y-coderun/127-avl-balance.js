import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const inputData = [];

rl.on("line", line => {
    inputData.push(line.trim());
});

class Node {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function addNode(root, n) {
    if (!root) {
        return new Node(n);
    }
    if (n < root.val) {
        root.left = addNode(root.left, n);
    } else if (n > root.val) {
        root.right = addNode(root.right, n);
    }

    return root;
}

rl.on("close", () => {
    const nums = inputData[0].split(" ").map(n => parseInt(n, 10));
    const root = new Node(nums[0]);
    for (let i = 1; i < nums.length - 1; i++) {
        addNode(root, nums[i]);
    }
    const result = isBalanced(root);

    if (result) {
        console.log("YES");
    } else {
        console.log("NO");
    }
});

function isBalanced(root) {
    function dfs(root) {
        if (!root) return 0;
        const left = dfs(root.left);
        const right = dfs(root.right);

        if (left === -1 || right === -1 || Math.abs(left - right) > 1) return -1;

        return Math.max(left, right) + 1;
    }

    return dfs(root) !== -1;
}

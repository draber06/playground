import assert from "assert";

function findSimilarSubTreesDfsRecursive(root) {
    const setToNodes = new Map();

    function dfs(node) {
        if (!node) return new Set();

        const left = dfs(node.left);
        const right = dfs(node.right);

        const currSet = new Set([...left.set, ...right.set, node.val]);

        if (node.left || node.right) {
            const key = [...currSet].sort().join("");
            if (!setToNodes.has(key)) setToNodes.set(key, []);
            setToNodes.get(key).push(node);
        }

        return currSet;
    }

    dfs(root);

    for (let nodes of setToNodes.values()) {
        if (nodes.length >= 2) {
            return [nodes[0], nodes[1]];
        }
    }

    return null;
}

function findSimilarSubTreesDfsIterative(root) {
    const stack = [{ node: root, visited: false }];
    const maskToNodes = new Map();
    const nodeToMask = new Map();

    while (stack.length) {
        const top = stack.pop();
        if (!top.visited) {
            stack.push({ node: top.node, visited: true });
            if (top.node.right) {
                stack.push({ node: top.node.right, visited: false });
            }
            if (top.node.left) {
                stack.push({ node: top.node.left, visited: false });
            }
        } else {
            const leftSet = top.node.left ? nodeToMask.get(top.node.left) : new Set();
            const rightSet = top.node.right ? nodeToMask.get(top.node.right) : new Set();
            const currSet = new Set([...leftSet, ...rightSet, top.node.val]);

            nodeToMask.set(top.node, currSet);

            if (top.node.left || top.node.right) {
                const key = [...currSet].sort().join("");
                if (!maskToNodes.has(key)) maskToNodes.set(key, []);
                maskToNodes.get(key).push(top.node);
            }
        }
    }

    for (let nodes of maskToNodes.values()) {
        if (nodes.length > 1) {
            return [nodes[0], nodes[1]];
        }
    }

    return null;
}

class Node {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

const tree1 = new Node(
    "A",
    new Node("B", new Node("B", new Node("B"), new Node("D")), new Node("C")),
    new Node("C", null, new Node("B", new Node("B"), new Node("D")))
);

assert.deepEqual(findSimilarSubTreesDfsRecursive(tree1), [tree1.left, tree1.right]);

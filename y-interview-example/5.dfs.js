import assert from "assert";
/*
    Дана древовидная структура следующего формата:

    const tree = {
        type: "nested",
        children: [
            { type: "added", value: 42 },
            {
                type: "nested",
                children: [
                    {
                        type: "added",
                        value: 43,
                    },
                ],
            },
            { type: "added", value: 44 },
            ...
        ],
    };

    Необходимо написать функцию `getNodes(tree, type)`,
    которая возвращает все ноды в порядке следования, соответствующие переданному типу.

    Глубина вложенности любая.
 */

// Time - O(n)
// Space - O(n)
function getNodesDfs(tree, type) {
    const stack = [tree];
    const result = [];

    while (stack.length > 0) {
        const node = stack.pop();

        if (node.type === type) {
            result.push(node);
        }

        const children = node.children;
        if (children) {
            for (let i = children.length - 1; i >= 0; i--) {
                stack.push(children[i]);
            }
        }
    }

    return result;
}

function getNodesDfsRecursive(tree, type) {
    if (tree.value) {
        return tree.type === type ? [tree] : [];
    }

    return tree.children.flatMap(node => getNodesDfsRecursive(node, type));
}

function getNodesBfs(tree, type) {
    const queue = [tree];
    const result = [];
    let i = 0;

    while (i < queue.length) {
        const node = queue[i++];
        if (node.type === type) {
            result.push(node);
        }

        if (node.children) {
            for (const child of node.children) {
                queue.push(child);
            }
        }
    }

    return result;
}

const tree = {
    type: "nested",
    children: [
        { type: "added", value: 42 },
        {
            type: "nested",
            children: [
                {
                    type: "added",
                    value: 43,
                },
            ],
        },
        { type: "added", value: 44 },
    ],
};

assert.deepEqual(getNodesDfs(tree, "added"), [
    { type: "added", value: 42 },
    { type: "added", value: 43 },
    { type: "added", value: 44 },
]);

assert.deepEqual(getNodesBfs(tree, "added"), [
    { type: "added", value: 42 },
    { type: "added", value: 43 },
    { type: "added", value: 44 },
]);

assert.deepEqual(getNodesDfsRecursive(tree, "added"), [
    { type: "added", value: 42 },
    { type: "added", value: 43 },
    { type: "added", value: 44 },
]);

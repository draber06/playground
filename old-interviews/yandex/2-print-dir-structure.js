// Дана вложенная структура файлов и папок.

import { Children } from "react";

const data = {
    name: "folder",
    Children: [
        { name: "file1.txt" },
        { name: "file2.txt" },
        {
            name: "images",
            children: [
                { name: "image.png" },
                {
                    name: "vacation",
                    children: [{ name: "crocodile.png" }, { name: "penguin.png" }],
                },
            ],
        },
        { name: "shopping-list.pdf" },
    ],
};

/**
 * Нужно вывести в консоль файлы и папки с отступами, чтобы показать вложенность.
 * Решение должно учитывать любую возможность элементов (т.е. не должно содержать рекурсивные вызовы).
 */

/*
folder
    file1.txt
    file2.txt
    images
        image.png
        vacation
            crocodile.ong
            penguin.png
        shopping-list.pdf
*/

function printDirectoryStructure(data) {
    // your code here
}

console.clear();
printDirectoryStructure(data);

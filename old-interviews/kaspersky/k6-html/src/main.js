// 1. Изменив style.css (не меняя разметки) повторите фигуру на рисунке
// 2. Напишите код, с помощью которого при клике на прямоугольник будет выведен его цвет

const blocks = document.querySelectorAll(".container > div");

for (const block of blocks) {
    block.addEventListener("click", event => {
        console.log(event.target.style.backgroundColor);
    });
}

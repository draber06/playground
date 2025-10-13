const elements = document.querySelectorAll(".container div");

for (const element of elements) {
    element.addEventListener("click", event => {
        console.log(event.target.style.backgroundColor);
    });
}

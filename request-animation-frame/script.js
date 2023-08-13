(function () {
    document.addEventListener("DOMContentLoaded", () => {
        let prev = performance.now();
        const start = new Date();
        function repeatOften(time) {
            const diff = (new Date() - start) / 1000;
            if (diff < 5) {
                // const box = document.createElement("div");
                document.body.insertAdjacentHTML("beforeEnd", `<div>${Math.floor(time - prev)}</div>`);
                prev = time;
                requestAnimationFrame(repeatOften);
            }
        }
        requestAnimationFrame(repeatOften);
    });
})();

function pisanoPeriod(m) {
    let current = 0;
    let next = 1;
    let period = 0;

    while (true) {
        const oldNext = next;
        next = (current + next) % m;
        current = oldNext;
        period++;
        if (current === 0 && next == 1) {
            return period;
        }
    }
}

function fibonacciModByPisanoPeriod(n, m) {
    const period = pisanoPeriod(m);
    const r = n % period;

    let prev = 0;
    let current = 1;
    for (let i = 0; i < r - 1; i++) {
        const oldCurrent = current;
        current = (oldCurrent + prev) % m;
        prev = oldCurrent;
    }

    return current;
}

console.log(fibonacciModByPisanoPeriod(115, 1000));

function throttle(fn, delay, thisArg) {
    let lastArgs;
    let isThrottled = false;

    function throttleFn(...args) {
        if (isThrottled) {
            lastArgs = args;
            return;
        }

        fn.apply(thisArg, args);
        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;

            if (lastArgs) {
                throttleFn(...lastArgs);
                lastArgs = null;
            }
        }, delay);
    }

    return throttleFn;
}

function debounce(fn, delay, thisArg) {
    let timerId;

    return (...args) => {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            fn.apply(thisArg, args);
        }, delay);
    };
}

function test() {
    const start = Date.now();

    function log(text) {
        const msPassed = Date.now() - start;
        console.log(`${msPassed}: ${this.name} logged ${text}`);
    }

    const throttled = throttle(log, 100, { name: "me" });

    setTimeout(() => throttled("m"), 0);
    setTimeout(() => throttled("mo"), 22);
    setTimeout(() => throttled("mos"), 33);
    setTimeout(() => throttled("mosc"), 150);
    setTimeout(() => throttled("moscow"), 400);

    // Ожидаемый вывод
    // 0ms: me logged m
    // 100ms: me logged mos
    // 200ms: me logged mosc
    // 400ms: me logged moscow
}

test();

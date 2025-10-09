function timeLimited(fn, limit) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => reject(new Error("Time limit exceeded")), limit);

            Promise.resolve(fn(...args))
                .then(resolve)
                .catch(reject)
                .finally(() => clearTimeout(timeoutId));
        });
    };
}

function timeLimitedBest(fn, limit) {
    return (...args) => {
        let timeoutId;
        const timeout = new Promise((resolve, reject) => {
            timeoutId = setTimeout(() => reject(new Error("Time limit exceeded")), limit);
        });

        return Promise.race([Promise.resolve(fn(...args)), timeout]).finally(() => {
            clearTimeout(timeoutId);
        });
    };
}

const asyncF = x => new Promise(resolve => setTimeout(() => resolve(x * 2), 1000));

const limitedFunc = timeLimited(asyncF, 500);

limitedFunc(5).then(console.log).catch(console.error);

const limitedFunc2 = timeLimited(asyncF, 1500);

limitedFunc2(5).then(console.log).catch(console.error);

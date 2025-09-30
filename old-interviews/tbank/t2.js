function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let resolvedCount = 0;

        if (promises.length === 0) {
            resolve([]);
            return;
        }

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(res => {
                    resolvedCount++;
                    results[index] = res;
                    if (resolvedCount === promises.length) {
                        resolve(results);
                    }
                })
                .catch(reject);
        });
    });
}

function promiseAllSettled(promises) {
    return new Promise(resolve => {
        const results = [];
        let settledCount = 0;

        if (promises.length === 0) {
            resolve([]);
            return;
        }

        promises.forEach((promise, i) => {
            Promise.resolve(promise)
                .then(value => {
                    results[i] = { status: "fulfilled", value };
                })
                .catch(err => {
                    results[i] = { status: "rejected", reason: err };
                })
                .finally(() => {
                    settledCount++;
                    if (settledCount === promises.length) {
                        resolve(results);
                    }
                });
        });
    });
}

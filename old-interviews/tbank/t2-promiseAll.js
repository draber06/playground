function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        // your code
        const result = [];
        if (promises.length === 0) {
            resolve([]);
            return;
        }
        let resolvedCount = 0;

        promises.forEach((promise, i) => {
            promise
                .then(res => {
                    result[i] = res;
                    resolvedCount++;
                    if (resolvedCount === promises.length) {
                        resolve(result);
                    }
                })
                .catch(reject);
        });
    });
}

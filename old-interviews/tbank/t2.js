function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let resolvedCount = 0;

        if (promises.length === 0) {
            resolve(results);
            return;
        }

        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i])
                .then(res => {
                    results[i] = res;
                    resolvedCount++;
                    if (resolvedCount === promises.length) {
                        resolve(results);
                    }
                })
                .catch(err => {
                    reject(err);
                });
        }
    });
}
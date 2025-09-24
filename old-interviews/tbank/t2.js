function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        const result = [];
        if (promises.length === 0) {
            resolve(result);
            return;
        }
        let resolved = 0;

        promises.forEach((promise, i) => {
            Promise.resolve(promise)
                .then(res => {
                    result[i] = res;
                    resolved++;
                    if (resolved === promises.length) {
                        resolve(result);
                    }
                })
                .catch(reject);
        });
    });
}

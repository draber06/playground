function customFetch(retryCount = 0, ...fetchArgs) {
    const promise = fetch(...fetchArgs);

    const retry = remainingRetries => {
        return promise
            .then(res => (res.ok ? res : Promise.reject(res)))
            .catch(err => {
                if (!remainingRetries) {
                    return Promise.reject(err);
                }
                return retry(remainingRetries - 1);
            });
    };

    return retry(retryCount);
}

// customFetch(2, "https://api.weather.yandex.ru/v2/informers?").catch(e => {
//     console.error(e.status);
//     console.error(e.statusText);
// });
customFetch(0, "https://www.google.com/");

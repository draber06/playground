function customFetch(retryCount = 3, ...fetchArgs) {
    const attempt = remainingRetries => {
        return fetch(...fetchArgs)
            .then(res => {
                if (res.ok) return res;
                throw res;
            })
            .catch(err => {
                if (remainingRetries > 0) {
                    return attempt(remainingRetries - 1);
                }
                throw err;
            });
    };

    return attempt(retryCount);
}

// customFetch(2, "https://api.weather.yandex.ru/v2/informers?").catch(e => {
//     console.error(e.status);
//     console.error(e.statusText);
// });
customFetch(0, "https://www.google.com/");

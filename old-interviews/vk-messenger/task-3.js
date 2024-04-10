function fetchWithRetries(retriesCount = 0, ...fetchArgs) {
    return fetch(...fetchArgs).catch(err => {
        if (retriesCount > 1) return fetchWithRetries(retriesCount - 1, ...fetchArgs);
        return err;
    });
}

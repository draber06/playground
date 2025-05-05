function fetchWithRetries(retriesCount = 0, ...fetchArgs) {
    return fetch(...fetchArgs)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res;
        })
        .catch(() => {
            const remainingRetries = retriesCount - 1;

            if (!remainingRetries) {
                throw new Error("Попытки закончились");
            }
            return fetchWithRetries(remainingRetries, ...fetchArgs);
        });
}

fetchWithRetries(3, "https://rickandmortyapi.com/api/character/?name=asdfasdfasdf&status=alive")
    .then(res => {
        return res.json();
    })
    .then(res => console.log(res));

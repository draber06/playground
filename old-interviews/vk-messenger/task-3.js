function fetchWithRetries(retriesCount = 0, ...fetchArgs) {
    return fetch(...fetchArgs)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP Error! Status: ${res.status}`);
            }
            return res.json();
        })
        .catch(err => {
            if (retriesCount > 1) {
                return fetchWithRetries(retriesCount - 1, ...fetchArgs);
            }
            throw err;
        });
}

const test = await fetchWithRetries(3, "https://pokeapi.co/api/v2/pokemon/ditto");
console.log("-----", "test", test);

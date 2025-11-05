async function fetchWithRetries(retriesCount = 3, ...fetchArgs) {
    for (let attempt = 0; attempt <= retriesCount; attempt++) {
        try {
            return await fetch(...fetchArgs);
        } catch (err) {
            console.error(`Failed to fetch, try = ${attempt}`);
        }
    }

    throw new Error(`Failed to fetch after ${retriesCount + 1} attempts`);
}

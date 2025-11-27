async function retry(url, attempts = 5) {
    let retries = 0;

    while (retries < attempts) {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Ошибка HTTP: ${res.status}`);
            }

            return res;
        } catch (err) {
            retries++;
            if (retries >= attempts) {
                throw new Error("Заданный URL недоступен");
            }
        }
    }
}

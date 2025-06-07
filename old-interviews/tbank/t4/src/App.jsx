import { useEffect, useRef, useState } from "react";

// Написать приложение с полем ввода для поиска героев
// Поддерживает постраничную навигацию
// Добавить дебаунс запросов

function getPeople(name, page = 1, options = {}) {
  return fetch(`https://rickandmortyapi.com/api/character?name=${name}&page=${page}`, options).then(
    async res => {
      if (!res.ok) {
        throw new Error(`API Error ${res.status}`);
      }
      return res.json();
    }
  );
}

const useDebouncedValue = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeoutId);
  }, [delay, value]);

  return debouncedValue;
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm);

  const [page, setPage] = useState(1);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);

  useEffect(() => {
    abortControllerRef.current?.abort();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsLoading(true);
    setError(null);

    getPeople(debouncedSearchTerm, page, { signal: abortController.signal })
      .then(res => {
        setData(res);
        setError(null);
      })
      .catch(error => {
        if (error.name === "AbortError") {
          return;
        }
        setError(error);
      })
      .finally(() => setIsLoading(false));

    return () => {
      abortController.abort();
    };
  }, [debouncedSearchTerm, page]);

  const nextPage = () => setPage(prevPage => prevPage + 1);

  const prevPage = () => setPage(prevPage => (prevPage === 1 ? 1 : prevPage - 1));

  return (
    <div>
      <h1>Найди своего героя</h1>
      <input
        type="text"
        name="search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div style={{ padding: "16px 20px" }}>
        <div style={{ minHeight: 400 }}>
          {error ? (
            <div>Упс! Не удалось найти героя. Попробуйте изменить поисковый запрос.</div>
          ) : isLoading ? (
            <div>Загрузка...</div>
          ) : (
            <ul style={{ margin: 0, padding: 0 }}>
              {data?.results.map(hero => (
                <li key={hero.id}>{hero.name}</li>
              ))}
            </ul>
          )}
        </div>

        {data && (
          <div style={{ display: "flex", alignItems: "center", columnGap: 8 }}>
            <button disabled={isLoading || !data.info.prev} onClick={prevPage}>
              Назад
            </button>
            <span>
              {page}/{data.info.pages}
            </span>
            <button disabled={isLoading || !data.info.next} onClick={nextPage}>
              Вперед
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import { useCallback, useEffect, useRef, useState } from "react";

// Написать приложение с полем ввода для поиска героев
// Поддерживает постраничную навигацию
// Добавить дебаунс запросов
// function getPeople(name, page = 1, options = {}) {
//   return fetch(`https://rickandmortyapi.com/api/character?name=${name}&page=${page}`, options).then(
//     res => res.json()
//   );
// }

const createUrl = (baseUrl, params = {}) => {
  const url = new URL(baseUrl, window.location.origin);

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      url.searchParams.append(k, v);
    }
  });

  return url.toString();
};

const useQuery = (baseUrl, options = { query: {} }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = createUrl(baseUrl, options.query);

  const abortController = useRef(null);

  useEffect(() => {
    abortController.current?.abort();
    const controller = new AbortController();
    abortController.current = controller;

    setIsLoading(true);
    setError(null);
    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) {
          throw new Error(`API Error ${res.status}`);
        }
        return res.json();
      })
      .then(res => {
        setData(res);
        setError(null);
      })
      .catch(error => {
        if (error.name !== "AbortError") {
          setError(error);
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [url]);

  return {
    data,
    error,
    isLoading,
  };
};

const usePagination = (options = { page: 1 }) => {
  const [page, setPage] = useState(options.page);

  useEffect(() => {
    setPage(options.page);
  }, [options.page]);

  const next = useCallback(() => setPage(prevPage => prevPage + 1), []);

  const prev = useCallback(() => setPage(prevPage => (prevPage === 1 ? 1 : prevPage - 1)), []);

  return {
    page,
    next,
    prev,
  };
};

const useDebouncedValue = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm);

  const { page, next, prev } = usePagination({ page: 1 });

  const { data, isLoading, error } = useQuery("https://rickandmortyapi.com/api/character", {
    query: {
      name: debouncedSearchTerm,
      page,
    },
  });

  const handleSearchTermChange = e => setSearchTerm(e.target.value);

  return (
    <div style={{ padding: "16px 20px" }}>
      <h1>Найди своего героя:</h1>
      <input name="search" value={searchTerm} onChange={handleSearchTermChange} />
      <div style={{ minHeight: "400px", padding: "12px 0" }}>
        {isLoading ? (
          <div>Загружается...</div>
        ) : error ? (
          <div>
            Упс! Произошла ошибка. Попробуйте изменить ваш запрос или перезагрузить страницу.
          </div>
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
          <button disabled={isLoading || !data?.info.prev} onClick={prev}>
            Назад
          </button>
          <div>
            {page}/{data?.info.pages}
          </div>
          <button disabled={isLoading || !data?.info.next} onClick={next}>
            Вперед
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

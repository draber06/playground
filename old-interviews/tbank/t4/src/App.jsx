import { useCallback, useEffect, useRef, useState } from "react";

// Написать приложение с полем ввода для поиска героев
// Поддерживает постраничную навигацию
// Добавить дебаунс запросов
// function getPeople(name, page = 1, options = {}) {
//   return fetch(`https://rickandmortyapi.com/api/character?name=${name}&page=${page}`, options).then(
//     res => {
//       if (!res.ok) {
//         throw new Error(`API error ${res.status}`);
//       }
//       return res.json();
//     }
//   );
// }

const useDebouncedValue = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
};

const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  const goToPrevPage = useCallback(() => {
    setPage(prevPage => (prevPage === 1 ? 1 : prevPage - 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  return {
    page,
    goToPrevPage,
    goToNextPage,
  };
};

const createUrl = (baseUrl, params = {}) => {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.append(k, v);
  });
  return url.toString();
};

const useQuery = (baseUrl, searchParams) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const abortControllerRef = useRef(null);

  const url = createUrl(baseUrl, searchParams);

  useEffect(() => {
    abortControllerRef?.current?.abort();
    const abortController = new AbortController();
    abortControllerRef.currrent = abortController;

    setIsLoading(true);
    setError(null);

    fetch(url, { signal: abortController.signal })
      .then(res => {
        if (!res.ok) {
          throw new Error(`API error ${res.status}`);
        }
        return res.json();
      })
      .then(res => {
        setData(res);
        setError(null);
      })
      .catch(error => {
        if (error.name === "AbortError") return;
        setError(error);
      })
      .finally(() => setIsLoading(false));

    return () => {
      abortController.abort();
    };
  }, [url]);

  return {
    data,
    error,
    isLoading,
  };
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm);
  const { page, goToPrevPage, goToNextPage } = usePagination();
  const { data, error, isLoading } = useQuery("https://rickandmortyapi.com/api/character", {
    name: debouncedSearchTerm,
    page,
  });

  return (
    <div style={{ padding: "16px 20px" }}>
      <h1>Найди своего героя</h1>
      <input name="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      <div style={{ minHeight: 400, padding: "16px 8px" }}>
        {error ? (
          <div>
            Упс, не удалось загрузить героев! Попробуйте изменить поисковый запрос или обновить
            страницу.
          </div>
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
      <div style={{ display: "flex", alignItems: "center", columnGap: 8 }}>
        <button disabled={isLoading || !data?.info.prev} onClick={goToPrevPage}>
          Назад
        </button>
        <span>
          {page}/{data?.info.pages}
        </span>
        <button disabled={isLoading || !data?.info.next} onClick={goToNextPage}>
          Вперед
        </button>
      </div>
    </div>
  );
}

export default App;

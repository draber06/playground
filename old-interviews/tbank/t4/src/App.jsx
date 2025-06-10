import { useCallback, useEffect, useRef, useState } from "react";

// Написать приложение с полем ввода для поиска героев
// Поддерживает постраничную навигацию
// Добавить дебаунс запросов
function getPeople(name, page = 1, options = {}) {
  return fetch(`https://rickandmortyapi.com/api/character?name=${name}&page=${page}`, options).then(
    res => res.json()
  );
}

const createUrl = (baseUrl, params = {}) => {
  const url = new URL(baseUrl);

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      url.searchParams.append(k, v);
    }
  });

  return url.toString();
};

const debounce = (fn, delay = 300) => {
  let timeoutId;
  const debounced = function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };

  debounced.cancel = function () {
    clearTimeout(timeoutId);
    timeoutId = null;
  };

  return debounced;
};

const useQuery = (baseUrl, params, delay = 300) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);

  const debouncedFetch = useCallback(
    debounce(
      (url, signal) =>
        fetch(url, { signal })
          .then(res => {
            if (!res.ok) {
              throw new Error(`API Error ${res.status}`);
            }
            return res.json();
          })
          .then(res => {
            setIsLoading(false);
            setError(null);
            setData(res);
          })
          .catch(error => {
            if (error.name === "AbortError") return;
            setError(error);
          })
          .finally(() => setIsLoading(false)),
      delay
    ),
    [delay]
  );

  const url = createUrl(baseUrl, params);

  useEffect(() => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setError(null);

    debouncedFetch(url, controller.signal);

    return () => {
      controller.abort();
      debouncedFetch.cancel();
    };
  }, [url, debouncedFetch]);

  return {
    data,
    isLoading,
    error,
  };
};

const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  const goToNextPage = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const goToPrevPage = useCallback(() => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  }, []);

  return { page, goToPrevPage, goToNextPage, setPage };
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { page, goToPrevPage, goToNextPage, setPage } = usePagination(1);

  const { data, isLoading, error } = useQuery("https://rickandmortyapi.com/api/character", {
    name: searchTerm,
    page,
  });

  const handleSearchTermChange = e => {
    setSearchTerm(e.target.value);
    setPage(1);
  };
  return (
    <div>
      <h1>Найди своего героя</h1>
      <input name="search" value={searchTerm} onChange={handleSearchTermChange} />
      <div style={{ minHeight: 400, padding: "16px 20px" }}>
        {error ? (
          <div>
            Упс! Не удалось найти героя. Попробуйте изменить параметры поиска или перезагрузить
            страницу.
          </div>
        ) : isLoading ? (
          <div>Загружается...</div>
        ) : (
          <ul>
            {data?.results.map(hero => (
              <li key={hero.id}>{hero.name}</li>
            ))}
          </ul>
        )}
      </div>
      {data && (
        <div style={{ display: "flex", alignItems: "center", columnGap: 8 }}>
          <button onClick={goToPrevPage} disabled={page === 1}>
            Назад
          </button>
          <span>
            {page}/{data?.info.pages}
          </span>
          <button onClick={goToNextPage} disabled={page === data?.info.pages}>
            Вперёд
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

import { useCallback, useEffect, useState } from "react";

/**
 * Написать приложение с полем ввода для поиска героев
 * Поддерживает постраничную навигацию
 * Добавить дебаунс запросов
 *
 * Вынести запрос в кастомный хук с добавлением пагинации
 * Реализовать кнопку для подгрузки данных
 */
function getPeople(name, page = 1, options = {}) {
  return fetch(`https://rickandmortyapi.com/api/character?name=${name}&page=${page}`, options).then(
    res => {
      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }
      return res.json();
    }
  );
}

function useGetPeopleQuery(name, page) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const abortController = new AbortController();

    getPeople(name, page, { signal: abortController.signal })
      .then(setData)
      .catch(err => {
        if (err.name === "AbortError") return;
        setData(null);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [name, page]);

  return {
    data,
    isLoading,
    error,
  };
}

function usePagination(initialPage = 1) {
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  const onPrevPage = useCallback(() => {
    setPage(prevPage => Math.max(1, prevPage - 1));
  }, []);

  const onNextPage = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const resetPage = useCallback(() => {
    setPage(initialPage);
  }, [initialPage]);

  return {
    page,
    onPrevPage,
    onNextPage,
    resetPage,
  };
}

function useDebouncedValue(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebouncedValue(searchQuery);

  const { page, resetPage, onNextPage, onPrevPage } = usePagination(1);

  const { data, isLoading, error } = useGetPeopleQuery(debouncedSearchQuery, page);

  const handleSearch = e => {
    setSearchQuery(e.target.value);
    resetPage();
  };

  return (
    <div>
      <input name="search" value={searchQuery} onChange={handleSearch} />

      <div>
        <div style={{ padding: "12px 16px", minHeight: 400 }}>
          {isLoading ? (
            <div>Загружается...</div>
          ) : error ? (
            <div>Упс! Произошла ошибка. Попробуйте изменить запрос.</div>
          ) : (
            <ul>
              {data.results.map(hero => (
                <li key={hero.id}>{hero.name}</li>
              ))}
            </ul>
          )}
        </div>

        {data && (
          <div style={{ display: "inline-flex", gap: 8 }}>
            <button onClick={onPrevPage} disabled={isLoading || !data.info.prev}>
              Назад
            </button>
            <span>
              {page}/{data.info.pages}
            </span>
            <button onClick={onNextPage} disabled={isLoading || !data.info.next}>
              Вперёд
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

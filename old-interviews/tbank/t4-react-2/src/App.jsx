import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
      if (res.ok) {
        return res.json();
      }

      throw new Error(`HTTP Error: ${res.status}, ${res.statusText}`);
    }
  );
}

function usePagination(initialPage = 1) {
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  const nextPage = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPage(prevPage => Math.max(1, prevPage - 1));
  }, []);

  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  return { page, nextPage, prevPage, resetPage };
}

function debounce(fn, delay) {
  let timeout;

  function debounced(...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }

  debounced.cancel = () => {
    clearTimeout(timeout);
  };

  return debounced;
}

function useGetPeopleQuery({ page, name }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHeroes = useMemo(
    () =>
      debounce(async (name, page, signal) => {
        setIsLoading(true);
        setError(null);

        try {
          const result = await getPeople(name, page, { signal });
          setData(result);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err);
            setData(null);
          }
        } finally {
          setIsLoading(false);
        }
      }, 300),
    []
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchHeroes(name, page, abortController.signal);

    return () => {
      abortController.abort();
      fetchHeroes.cancel();
    };
  }, [fetchHeroes, name, page]);

  return {
    data,
    isLoading,
    error,
    page,
  };
}

function HeroList({ heroes = [] }) {
  if (!heroes.length) {
    return <div>Нет результата. Попробуйте изменить поисковый запрос.</div>;
  }

  return (
    <ul>
      {heroes.map(hero => (
        <li key={hero.id}>{hero.name}</li>
      ))}
    </ul>
  );
}

function AsyncSection({ isLoading, error, children }) {
  if (isLoading) {
    return <div>Загружается...</div>;
  }

  if (error) {
    return <div>Ошибка. Попробуйте перегрузить страницу.</div>;
  }

  return children;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const { page, prevPage, nextPage, resetPage } = usePagination(1);
  const { data, isLoading, error } = useGetPeopleQuery({ page, name: searchTerm });

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
    resetPage();
  };

  return (
    <div>
      <input name="search" onChange={handleSearchChange} value={searchTerm} />

      <div>
        <div style={{ padding: "12px 16px", minHeight: 450 }}>
          <AsyncSection error={error} isLoading={isLoading}>
            <HeroList heroes={data?.results} />
          </AsyncSection>
        </div>

        {data && (
          <div style={{ display: "inline-flex", gap: 8 }}>
            <button onClick={prevPage} disabled={isLoading || !data.info.prev}>
              Назад
            </button>
            <div>
              {page}/{data.info.pages}
            </div>
            <button onClick={nextPage} disabled={isLoading || !data.info.next}>
              Вперед
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

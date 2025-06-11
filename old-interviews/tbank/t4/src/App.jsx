import { useState, useEffect, useCallback, useRef, useReducer } from "react";

const createUrl = (baseUrl, queryParams = {}) => {
  const url = new URL(baseUrl);
  Object.entries(queryParams).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      url.searchParams.append(k, v);
    }
  });
  return url.toString();
};

const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  const toPrevPage = useCallback(() => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  }, []);
  const toNextPage = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  return {
    page,
    resetPage,
    toPrevPage,
    toNextPage,
  };
};

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const queryReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, error: null };
    case "FETCH_FAILED":
      return { ...state, isLoading: false, error: action.payload };
    case "FETCH_SUCCEEDED":
      return { ...state, isLoading: false, data: action.payload };
  }
};

const useQuery = (baseUrl, queryParams = {}) => {
  const [{ data, isLoading, error }, dispatch] = useReducer(queryReducer, initialState);

  console.log(data, isLoading, error);

  const abortControllerRef = useRef(null);

  const url = createUrl(baseUrl, queryParams);

  useEffect(() => {
    abortControllerRef.current?.abort();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    dispatch({ type: "FETCH_INIT" });

    fetch(url, { signal: abortController.signal })
      .then(res => {
        if (!res.ok) {
          throw new Error(`API error ${res.status}`);
        }
        return res.json();
      })
      .then(res => {
        dispatch({ type: "FETCH_SUCCEEDED", payload: res });
      })
      .catch(error => {
        if (error.name === "AbortError") return;
        dispatch({ type: "FETCH_FAILED", payload: error });
      });

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, isLoading, error };
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
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  const { page, resetPage, toPrevPage, toNextPage } = usePagination(1);

  const { data, isLoading, error } = useQuery("https://rickandmortyapi.com/api/character", {
    page,
    name: debouncedSearchTerm,
  });

  const handleSearchTermChange = e => {
    setSearchTerm(e.target.value.trim());
    resetPage();
  };

  return (
    <div>
      <h1>Найди своего героя</h1>
      <input name="search" value={searchTerm} onChange={handleSearchTermChange} />
      <div style={{ minHeight: 400, padding: "16px 20px" }}>
        {error ? (
          <div>Упс, не удалось найти героя! Попробуйте изменить поисковый запрос.</div>
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
          <button disabled={isLoading || !data?.info.prev} onClick={toPrevPage}>
            Назад
          </button>
          <span>
            {page}/{data?.info.pages}
          </span>
          <button disabled={isLoading || !data?.info.next} onClick={toNextPage}>
            Вперёд
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

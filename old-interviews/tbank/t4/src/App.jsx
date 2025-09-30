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
    res => res.json()
  );
}

function App() {
  return `your code`;
}

export default App;

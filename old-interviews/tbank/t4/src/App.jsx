// Написать приложение с полем ввода для поиска героев
// Поддерживает постраничную навигацию
// Добавить дебаунс запросов
function getPeople(name, page = 1, options = {}) {
  return fetch(`https://rickandmortyapi.com/api/character?name=${name}&page=${page}`, options).then(
    res => res.json()
  );
}

function App() {
  return `your code`;
}

export default App;

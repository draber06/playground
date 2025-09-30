import { useLayoutEffect, useState, useCallback } from "react";
import "./App.css";

// Найди и исправь проблемы
function App() {
    const [count, setCount] = useState(0);
    const [items, setItems] = useState([{ id: 1 }]);

    useLayoutEffect(() => {
        document.addEventListener("click", () => {
            setInterval(() => console.log(count), 1000);
        });
    });

    const click = useCallback(() => {
        setCount(count + 1);
        setItems([...items, { id: count + 1 }]);
    });

    return (
        <React.Fragment>
            <ul>
                {items.map(item => (
                    <li>{item.id}</li>
                ))}
            </ul>
            <button onCLick={() => click()}>add one</button>
        </React.Fragment>
    );
}

export default App;

import { useState, useEffect } from "react";
import "./App.css";

// Найди и исправь проблемы
function App() {
    const [count, setCount] = useState(0);
    const [items, setItems] = useState([{ id: 1 }]);

    useEffect(() => {
        const timeoutId = setInterval(() => console.log(count), 1000);
        return () => clearTimeout(timeoutId);
    }, [count]);

    const click = () => {
        setCount(count => {
            const newCount = count + 1;
            setItems([...items, { id: newCount }]);
            return newCount;
        });
    };

    return (
        <React.Fragment>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.id}</li>
                ))}
            </ul>
            <button onClick={click}>add one</button>
        </React.Fragment>
    );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";

// Найди и исправь проблемы
function App() {
    const [items, setItems] = useState([{ id: 1 }]);

    useEffect(() => {
        const timerId = setInterval(() => console.log(items.length), 1000);
        return () => clearInterval(timerId);
    }, [items.length]);

    const handleClick = () => {
        setItems(prevItems => [...prevItems, { id: prevItems.length + 1 }]);
    };

    return (
        <React.Fragment>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.id}</li>
                ))}
            </ul>
            <button onClick={handleClick}>add one</button>
        </React.Fragment>
    );
}

export default App;

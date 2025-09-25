import { useEffect, useState } from "react";
import "./App.css";

// Найди и исправь проблемы
function App() {
    const [items, setItems] = useState([{ id: 1 }]);

    useEffect(() => {
        const intervalId = setInterval(() => console.log(items.length), 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [items.length]);

    const handleAddItem = () => {
        setItems(prevItems => [...prevItems, { id: prevItems.length + 1 }]);
    };

    return (
        <div>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.id}</li>
                ))}
            </ul>
            <button onClick={handleAddItem}>add one</button>
        </div>
    );
}

export default App;

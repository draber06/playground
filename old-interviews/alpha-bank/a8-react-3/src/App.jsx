import { useState } from "react";
import "./App.css";

// Какие значения мы увидим в UI и сколько будет рендеров?
function App() {
    const [count, setCount] = useState(0);
    const [visible, setVisible] = useState(false);

    const changeCount = () => {
        setCount(count + 1);
        setVisible(true);
    };

    console.log("Rerender");

    return (
        <div>
            <h1> Counter</h1>
            <div>{count}</div>
            <div>{visible}</div>
            <button onClick={changeCount}>Change count</button>
        </div>
    );
}

export default App;

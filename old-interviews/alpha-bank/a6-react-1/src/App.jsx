import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Что произойдет при клике по кнопке?
function App() {
    const [count, setCount] = useState(0);

    const changeCount = () => {
        setCount(prevCount => prevCount + 1);
    };

    return (
        <div>
            <h1>Counter</h1>
            <div>{count}</div>
            <button onClick={changeCount}>Change count</button>
        </div>
    );
}

export default App;

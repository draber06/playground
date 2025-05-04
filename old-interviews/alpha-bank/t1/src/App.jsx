import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Что произойдет при клике по кнопке?
function App() {
    let count = 0;

    const changeCount = () => {
        count += 1;
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

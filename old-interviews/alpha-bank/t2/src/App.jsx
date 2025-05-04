import "./App.css";
import React from "react";

//Вывести значения первого и второго полей в консоль, в функции fn, учитывая что первый input controlled, а второй input uncontrolled
function App() {
    const [value, setValue] = React.useState("");
    const inputRef = React.useRef(null);

    const fn = e => {
        e.preventDefault();
        console.log(`first input value: ${value}`);
        console.log(`second input value: ${inputRef.current.value}`);
    };

    return (
        <form onClick={fn}>
            <input
                placeholder="controlled field"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <input placeholder="uncontrolled field" ref={inputRef} />
            <button>Отправить заявку на кредит</button>
        </form>
    );
}

export default App;

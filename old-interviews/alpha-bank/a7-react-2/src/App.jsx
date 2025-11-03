import "./App.css";
import React from "react";

//Вывести значения первого и второго полей в консоль, в функции fn, учитывая что первый input controlled, а второй input uncontrolled
function App() {
    const fn = () => {
        console.log(`first input value: `);
        console.log(`second input value: `);
    };

    return (
        <form onClick={fn}>
            <input placeholder="controlled field" />
            <input placeholder="uncontrolled field" />
            <button>Отправить заявку на кредит</button>
        </form>
    );
}

export default App;

import React from "react";
import "./App.css";

export default function App() {
    const forceUpdate = useForceUpdate();

    return (
        <div style={{ margin: "20px", padding: "20px", border: "2px solid green" }}>
            <button onClick={forceUpdate}>Render</button>
            {/* <RenderCount/> */}
            <Parent />
        </div>
    );
}

const Parent = () => {
    const [value, setValue] = React.useState("");
    const handleChange = e => {
        setValue(e.target.value);
    };

    return (
        <form style={{ margin: "20px", padding: "20px", border: "2px solid blue" }}>
            Input value is : {value}
            {/* <RenderCount /> */}
            <Child onChange={handleChange} />
        </form>
    );
};

const Child = ({ onChange }) => (
    <div style={{ margin: "20px", padding: "20px", border: "2px solid red" }}>
        <input type="text" name="value" onChange={onChange} />
        <RenderCount />
    </div>
);

function RenderCount() {
    const renderCount = React.useRef(1);

    React.useEffect(() => {
        renderCount.current++;
    });

    return <div style={{ marginTop: "10px" }}>Render count: {renderCount.current}</div>;
}

function useForceUpdate() {
    const [, setCount] = React.useState(0);

    return () => {
        setCount(c => c + 1);
    };
}

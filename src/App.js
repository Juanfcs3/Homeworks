import { useState } from "react";
import "./App.css";

function App({ defaultValue = 10 }) {
  const [counter, setCounter] = useState(defaultValue);

  const handleAdd = () => setCounter(counter + 1);
  const handleSubstract = () => setCounter(counter - 1);
  const handleReset = () => setCounter(defaultValue);

  return (
    <div className="app-container">
      <h1>Contador App</h1>
      <h2 className="counter">{counter}</h2>

      <div className="buttons">
        <button onClick={handleAdd} className="btn add">+1</button>
        <button onClick={handleSubstract} className="btn sub">-1</button>
        <button onClick={handleReset} className="btn reset">Reset</button>
|      </div>
    </div>
  );
}

export default App;
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementBy } from "./store/slices/counterSlice";
import { pushItem, popItem, clearStack } from "./store/slices/stackSlice";
import "./App.css";

function App() {
  const counter = useSelector((state) => state.counter.value);
  const stack = useSelector((state) => state.stack.items);
  const dispatch = useDispatch();

  const [incrementValue, setIncrementValue] = useState(0);
  const [stackInput, setStackInput] = useState("");

  return (
    <div className="App">
      <h1>Challenge 10 - Redux</h1>

      {/* Sección del contador */}
      <div className="card">
        <h2>Contador: {counter}</h2>
        <button onClick={() => dispatch(increment())}>+1</button>
        <button onClick={() => dispatch(decrement())}>-1</button>
        <br /><br />
        <input
          type="number"
          value={incrementValue}
          onChange={(e) => setIncrementValue(Number(e.target.value))}
          placeholder="Valor a incrementar"
        />
        <button onClick={() => dispatch(incrementBy(incrementValue))}>
          Incrementar por valor
        </button>
      </div>

      {/* Sección de la pila */}
      <div className="card">
        <h2>Pila (Stack)</h2>
        <input
          type="text"
          value={stackInput}
          onChange={(e) => setStackInput(e.target.value)}
          placeholder="Elemento"
        />
        <button
          onClick={() => {
            if (stackInput) {
              dispatch(pushItem(stackInput));
              setStackInput("");
            }
          }}
        >
          Push
        </button>
        <button onClick={() => dispatch(popItem())}>Pop</button>
        <button onClick={() => dispatch(clearStack())}>Clear</button>

        <ul>
          {stack.length > 0
            ? stack.map((item, i) => <li key={i}>{item}</li>)
            : <li>La pila está vacía</li>}
        </ul>
      </div>
    </div>
  );
}

export default App;

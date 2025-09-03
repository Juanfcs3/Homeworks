import React, { useState } from 'react';
import Child from './Child';

export default function Parent() {
    const list = [2, 4, 6, 8, 10];
    const [valor, setValor] = useState(0);

    const increment = (num) => {
    setValor(valor + num);
    };

    return (
    <div>
        <h1>Parent</h1>
        <p>Total: {valor}</p>
    <hr />

    {list.map((n, idx) => (
        <Child 
            key={idx} 
            numero={n} 
            increment={increment} 
    />
))}
    </div>
);
}
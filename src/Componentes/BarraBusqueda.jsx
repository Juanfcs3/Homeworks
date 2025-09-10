import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function BarraBusqueda() {

    const [params, setParams] = useSearchParams();
    const q = params.get('q') || '';
    const [valor, setValor] = useState(q);
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current?.focus();
}, []);

    const enviar = (e) => {
        e.preventDefault();
        setParams({ q: valor });
};

return (
    <form className="search-bar" onSubmit={enviar}>
    <input
        ref={inputRef}
        placeholder="Ingrese el nombre de la imagen que quiere buscar"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
    />
        <button type="submit">"Buscar"</button>
    </form>
);
}
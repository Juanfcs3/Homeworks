import React, { useState, useContext, useRef } from 'react';
import { ImagenContexto } from '../contexto/ImagenContexto.jsx';
import { useNavigate } from 'react-router-dom';

export default function FormularioAgregar() {
    const [id, setId] = useState('');
    const [titulo, setTitulo] = useState('');
    const { imagenes, agregarImagen } = useContext(ImagenContexto);
    const inputRef = useRef();
    const navegar = useNavigate();

    const enviar = (e) => {
    e.preventDefault();
        if (!id || !titulo) return alert('id y nombre son necesarios.');
        if (isNaN(Number(id))) return alert('El id debe ser numerico.');
        if (imagenes.some(img => img.id === Number(id))) {
        if (!window.confirm('Ya existe imagen con ese id ¿quiere agregar otra igual?')) return;
    }

    agregarImagen(Number(id), titulo);
    navegar('/');
};

return (
    <form className="add-form" onSubmit={enviar}>
        <label>ID (número)</label>
        <input ref={inputRef} value={id} onChange={e => setId(e.target.value)} placeholder="Ej: 123" />
        <label>Título</label>
        <input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Nombre de la imagen" />
        <button type="submit">Agregar imagen</button>
    </form>
);
}

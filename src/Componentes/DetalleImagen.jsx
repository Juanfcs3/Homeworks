import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ImagenContexto } from '../contexto/ImagenContexto.jsx';

export default function DetalleImagen() {
    const { id } = useParams();
    const { imagenes } = useContext(ImagenContexto);
    const imagen = imagenes.find(img => img.id === Number(id));

    if (!imagen) {
return (
        <div style={{ padding: '24px' }}>
        <h2>Imagen no encontrada</h2>
        <Link to="/">Volver</Link>
    </div>
);
}

return (
    <div style={{ padding: '24px', textAlign: 'center' }}>
        <h2>{imagen.titulo}</h2>
        <img src={imagen.url} alt={imagen.titulo} style={{ maxWidth: '90%', borderRadius: '8px' }} />
        <p style={{ marginTop: '12px' }}>ID: {imagen.id}</p>
        <Link to="/" style={{ color: '#1976d2' }}>⬅ Volver</Link>
    </div>
);
}

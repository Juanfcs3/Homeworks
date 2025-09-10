import React, { useContext, useMemo } from 'react';
import { ImagenContexto } from '../contexto/ImagenContexto.jsx';
import { useSearchParams } from 'react-router-dom';
import TarjetaImagen from './TarjetaImagen';

export default function ListaImagenes() {
    const { imagenes } = useContext(ImagenContexto);
    const [params] = useSearchParams();
    const q = (params.get('q') || '').toLowerCase();

    const filtradas = useMemo(() => {
    if (!q) return imagenes;
    return imagenes.filter(img => img.titulo.toLowerCase().includes(q));
}, [imagenes, q]);

return (
    <section className="gallery">
        {filtradas.length === 0 && <p>No se encontraron imagenes para mostrar</p>}
    <div className="grid">
        {filtradas.map(img => <TarjetaImagen key={img.id} imagen={img} />)}
    </div>
    </section>
);
}
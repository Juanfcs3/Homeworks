import React, { createContext, useState, useEffect, useCallback } from 'react';

export const ImagenContexto = createContext();

export const ImagenProveedor = ({ children }) => {
    const [imagenes, setImagenes] = useState(() => {
    const guardadas = localStorage.getItem('imagenes_v1');
        if (guardadas) return JSON.parse(guardadas);
return [
    { id: 10, titulo: 'Arbolada', url: 'https://picsum.photos/id/10/200/300' },
    { id: 100, titulo: 'Playa Blanca', url: 'https://picsum.photos/id/100/200/300' }
];
});

    useEffect(() => {
        localStorage.setItem('imagenes_v1', JSON.stringify(imagenes));
},  [imagenes]);

    const agregarImagen = useCallback((id, titulo) => {
    const nueva = { id: Number(id), titulo, url: `https://picsum.photos/id/${id}/200/300` };
        setImagenes(prev => [...prev, nueva]);
}, []);

return (
    <ImagenContexto.Provider value={{ imagenes, agregarImagen }}>
        {children}
    </ImagenContexto.Provider>
);
};

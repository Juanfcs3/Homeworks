import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function TarjetaImagen({ imagen }) {
return (

    <article className="card">
        <Link to={`/imagen/${imagen.id}`}>
        <img src={imagen.url} alt={imagen.titulo} />
    </Link>

    <div className="card-info">
        <h3>{imagen.titulo}</h3>
        <p className="status">Disponible</p>
    </div>
    </article>
);
}

TarjetaImagen.propTypes = {

    imagen: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}).isRequired
};
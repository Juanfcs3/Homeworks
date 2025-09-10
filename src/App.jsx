import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ListaImagenes from './Componentes/ListaImagenes';
import FormularioAgregar from './Componentes/FormularioAgregar';
import BarraBusqueda from './Componentes/BarraBusqueda';
import DetalleImagen from './Componentes/DetalleImagen';
import './index.css';

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <h1>Parcial 1 - Galeria</h1>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/agregar" className="add-link">Agregar imagen</Link>
        </nav>
      </header>

      <main>
        <BarraBusqueda />
        <Routes>
          <Route path="/" element={<ListaImagenes />} />
          <Route path="/agregar" element={<FormularioAgregar />} />
          <Route path="/imagen/:id" element={<DetalleImagen />} />
        </Routes>
      </main>
    </div>
  );
}
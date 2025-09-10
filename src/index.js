import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ImagenProveedor } from './contexto/ImagenContexto';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ImagenProveedor>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ImagenProveedor>
  </React.StrictMode>
);
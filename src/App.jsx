import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./SideBar";

const Home = () => (
  <div>
    <h1>Inicio</h1>
    <p>Bienvenido al sistema de menús dinámicos. Usa la barra lateral para explorar las diferentes secciones.</p>
  </div>
);

const Productos = () => (
  <div>
    <h1>Productos</h1>
    <p>Aquí puedes explorar los productos disponibles.</p>
    <p>Selecciona “Electrónicos” o “Ropa” para ver más detalles.</p>
  </div>
);

const Electronicos = () => (
  <div>
    <h1>Electrónicos</h1>
    <p>Encuentra una amplia variedad de dispositivos y gadgets tecnológicos.</p>
  </div>
);

const Ropa = () => (
  <div>
    <h1>Ropa</h1>
    <p>Descubre nuestra colección de prendas para todas las edades.</p>
  </div>
);

const Servicios = () => (
  <div>
    <h1>Servicios</h1>
    <p>Ofrecemos soporte y mantenimiento técnico para nuestros productos.</p>
  </div>
);

const Soporte = () => (
  <div>
    <h1>Soporte Técnico</h1>
    <p>Brindamos asistencia personalizada para resolver tus problemas técnicos.</p>
  </div>
);

const Mantenimiento = () => (
  <div>
    <h1>Mantenimiento</h1>
    <p>Servicio especializado para garantizar el buen funcionamiento de tus equipos.</p>
  </div>
);

const Contacto = () => (
  <div>
    <h1>Contacto</h1>
    <p>Correo: soporte@empresa.com</p>
    <p>Teléfono: (1) 800-123-4567</p>
  </div>
);

const App = () => {
  return (
    <div className="container">
      <Sidebar />
      <main className="content">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/electronicos" element={<Electronicos />} />
          <Route path="/productos/ropa" element={<Ropa />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/servicios/soporte" element={<Soporte />} />
          <Route path="/servicios/mantenimiento" element={<Mantenimiento />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

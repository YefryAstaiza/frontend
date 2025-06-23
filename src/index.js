import React from 'react';
// Importa React, necesario para trabajar con JSX y componentes.

import { createRoot } from 'react-dom/client';
// Importa createRoot (nueva API de React 18) para renderizar la app en el DOM.

import { BrowserRouter } from 'react-router-dom';
// Importa el componente BrowserRouter, que permite el manejo de rutas en una SPA (Single Page Application).

import './index.css';
// Importa los estilos globales de tu app definidos en index.css.

import App from './App';
// Importa el componente principal de tu app, donde están definidas las rutas y vistas.

const container = document.getElementById('root');
// Obtiene el nodo del DOM donde se montará toda tu aplicación (normalmente un <div id="root"> en index.html).

const root = createRoot(container);
// Crea una raíz de React usando la API moderna de React 18.

root.render(
  <React.StrictMode>
    {/* StrictMode ayuda a detectar errores potenciales. No afecta el resultado, solo emite advertencias en desarrollo. */}
    
    <BrowserRouter>
      {/* Habilita el enrutamiento para toda la app: ahora puedes usar rutas como '/', '/crear', etc. */}
      
      <App />
      {/* Renderiza el componente principal App dentro de BrowserRouter. */}
      
    </BrowserRouter>
  </React.StrictMode>
);
// Renderiza toda la aplicación React dentro del elemento con id="root"


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


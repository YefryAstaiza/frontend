import React from 'react';
import { Link } from 'react-router-dom';

// Componente funcional para la barra de navegación
const Navegacion = () => {
  return (
    <header>
      {/* Barra de navegación responsiva con sombra sutil y espaciado */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
        <div className="container">
          {/* Enlace que actúa como logo o nombre de la app */}
          <Link className="navbar-brand fw-bold text-uppercase" to="/">
            UsuariosApp
          </Link>

          {/* Botón que aparece en pantallas pequeñas para mostrar menú */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menú colapsable para los enlaces de navegación */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto text-center">
              {/* Enlace a la lista de usuarios */}
              <li className="nav-item px-2">
                <Link className="nav-link active" to="/">
                  Lista de Usuarios
                </Link>
              </li>

              {/* Enlace a crear usuario */}
              <li className="nav-item px-2">
                <Link className="nav-link" to="/CrearUsuario">
                  Crear Usuario
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navegacion;

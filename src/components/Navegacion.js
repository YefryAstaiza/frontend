import React from 'react'
import {Link} from 'react-router-dom'; 
//etiqueta de react para redireccionar a otra pagina


const Navegacion = () => {
return (
  <div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <link className="navbar-brand" to="/">
          usuarios
        </link>
        <a className="navbar-brand" href="#">
          Navbar
        </a>
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="navbar-brand" to="/">
                LISTA USUARIOS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="navbar-brand" to="/CrearUsuario">
                CREAR USUARIOS
              </Link>
            </li>
            <li className="nav-item"></li>
            <li className="nav-item"></li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
);
}

export default Navegacion

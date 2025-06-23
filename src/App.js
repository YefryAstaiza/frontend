
import './App.css'; 
// Importa los estilos definidos en el archivo App.css para aplicarlos globalmente al componente.

import {Routes, Route} from 'react-router-dom'; 
// Importa los componentes necesarios de React Router para definir rutas dentro de la aplicación.

import Navegacion from './components/Navegacion'; 
// Importa el componente de navegación principal que aparecerá en todas las vistas.

import CrearUsuarios from './components/CrearUsuarios'; 
// Importa el componente del formulario para crear o editar usuarios.

import ListaUsuarios from "./components/ListaUsuario"; 
// Importa el componente que muestra la lista de usuarios registrados.

// Componente funcional principal de la aplicación
function App() {
  return (
    <div className="">
      {/* Renderiza el componente de navegación en la parte superior de la app */}
      <Navegacion/> 

      {/* Contenedor de Bootstrap con padding para el contenido debajo de la barra de navegación */}
      <div className='container p-4'>

        {/* Define las rutas de la aplicación usando React Router */}
        <Routes>
          {/* Ruta raíz: muestra la lista de usuarios */}
          <Route path='/' element={<ListaUsuarios/>} />  

          {/* Ruta para crear un nuevo usuario */}
          <Route path='/CrearUsuario' element={<CrearUsuarios/>} />

          {/* Ruta para editar un usuario existente (recibe un parámetro :id) */}
          <Route path='/edit/:id' element={<CrearUsuarios/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App; 
// Exporta el componente App para que pueda usarse en otras partes del proyecto (por ejemplo, en index.js)


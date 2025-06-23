
import './App.css';
import {Routes, Route} from 'react-router-dom'

import Navegacion from './components/Navegacion'
import CrearUsuarios from './components/CrearUsuarios'
import ListaUsuarios from "./components/ListaUsuario";

function App() {
  return (
    <div className="">
   <Navegacion/> 
   <div className='container p-4'> //lo que hace es que no coje todo el ancho de la pantalla y le damos un pading de 4
    <Routes>
      <Route path='/' element={<ListaUsuarios/>} />  //para ver la lista de los usuarios, debe llamar a el componente ListaUsuarios
      <Route path='/CrearUsuario' element={<CrearUsuarios/>} />// la ruta /CrearUsuarios necesita llamar el componente CrearUsuarios
      <Route path='/edit/:id' element={<CrearUsuarios/>} />//para editar usuario ponemos :id para poder hacer la peticion
    </Routes>
   </div>
    </div>
  );
}

export default App;

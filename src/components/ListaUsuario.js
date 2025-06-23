//ListaUsuario hace el trabajo de traer y mostrar los usuarios desde la API. 
import React, { useEffect, useState } from "react";
// Importa React y dos hooks: useEffect para manejar efectos secundarios (como peticiones HTTP),
// y useState para manejar el estado local del componente.
import axios from 'axios'
// Importa Axios, una librería que facilita hacer peticiones HTTP.
import {Link} from "react-router-dom";
// Importa Link, un componente de React Router para navegar entre rutas sin recargar la página.

const ListaUsuario = () => { // Define una función de componente ListaUsuario.
    const [lista, setLista] = useState([])
  // Declara el estado "lista", que almacenará los usuarios. Comienza como un array vacío.
      useEffect(()=>{ // Hook que se ejecuta después del primer renderizado (o cuando "lista" cambia).
      const getUsuarios = async()=>{ // Función asíncrona para obtener los usuarios desde el backend.
          const res = await axios.get('http://localhost:4000/api/usuarios')// Hace una petición GET a tu API de usuarios.
          setLista(res.data)// Actualiza el estado "lista" con los datos recibidos.
      }
      getUsuarios()// Llama a la función inmediatamente.
    },[])// Dependencias del useEffect: al incluir "lista", este efecto se ejecuta cada vez que cambia "lista".
  // ⚠️ Esto puede causar un bucle infinito. Deberías dejarlo como `[]` para que se ejecute solo una vez.
  
    const eliminarUsuario = async(id)=>{
      // Define una función asíncrona para eliminar un usuario por su ID.
        await axios.delete(`http://localhost:4000/api/usuarios/${id}`)// Hace una petición DELETE al backend.
        alert('Usuario Eliminado exitosamente')
    }

  return (
    <div className="row">{/*Contenedor de Bootstrap con clase "row" para distribuir los cards en columnas.*/} 
        {/*Itera sobre cada usuario en la lista y devuelve un card por usuario.*/}     
      {lista.map((list) => (    
        
        <div className="col-md-4 p-2" key={list._id}>    {/* contenedor golbal de cada card el Key es para traer ese documento y que no se repita */}
          <div className="card">          {/*Componente padre  // Card de Bootstrap para representar visualmente a cada usuario.*/}
            <div className="card-header"> {/*Componente hijo // Parte superior del card (puedes incluir aquí un título si quieres).*/}</div>
                  <h5>Nombre: {list.nombre} </h5> {/*// Muestra el nombre del usuario. */}
            </div>
            <div className="card-body">
              <p>Apellido: {list.apellido} </p> {/*// Muestra el apellido del usuario. */}
              <p>Edad: {list.edad} </p>          {/*Las llaves {} en JSX permiten insertar expresiones JavaScript */}
              <p>Telefono: {list.telefono} </p>   {/*list es un objeto que contiene datos. */}
              <p>Correo: {list.correo} </p>        {/*.correo accede a la propiedad correo de ese objeto. */}
            </div>                                  {/*El valor se renderizará dinámicamente en ese lugar. */}
              <div className="card-footer"> {/*// Pie del card con botones de acción. */}
                {/* Botón Eliminar - Rojo */}
                <button className="btn btn-danger" onClick={()=>eliminarUsuario(list._id)}>{/*onClick: Llama a la función eliminarUsuario con el ID del usuario */}
                  Eliminar                                                   {/*list._id: Obtiene el ID único del objeto 'list' (usuario actual) */}
                </button>
                {/*// Botón que llama a la función eliminarUsuario con el ID correspondiente. */}
                
                <Link className="btn btn-primary m-1" to = {"/edit/"+list._id}>{/*Componente Link de react-router-dom para navegación SPA */}
                  Editar                           {/*to={"/edit/" + list._id}: Navega a una ruta dinámica con el ID (ej: /edit/123abc) */}   
                </Link>     
              </div>
        </div>
      ))}
    </div>
  );
}
export default ListaUsuario // Exporta el componente para poder usarlo en App.js u otros lugares.
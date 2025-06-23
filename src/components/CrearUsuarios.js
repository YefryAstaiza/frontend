//Este componente CrearUsuarios.js es fundamental para crear y actualizar usuarios dentro de tu app MERN.
//ciclo completo de datos, desde el formulario hasta la API:


import React, {useEffect, useState}from 'react' // Importa React y los hooks useEffect y useState para manejar ciclo de vida y estado interno.
//El useState recibe un valor inicial y retorna un array con dos elementos
//El primer elemento es el estado y el segundo es una funcion para actualizar el estado
//El estado es un objeto que puede contener cualquier tipo de dato
import axios from 'axios' // Librería para hacer peticiones HTTP a tu backend
import { useParams } from "react-router-dom";// Hook para obtener parámetros de la URL (como el ID del usuario en la ruta /edit/:id).
//Interfaz grafica de usuarios
const CrearUsuarios = () => {
  //Toda la logica de envio de datos se hara entre el const y el return
  const valorInicial ={
    nombre: '',
    apellido: '',
    edad: 0,  //efectivamente si genero error xD, Tener cuidado, si no guarda los datos es por que hay algo mal en el tipo de dato
    telefono:0 , //generara error? segun aqui espera un number pero al poner '' esperara un string -.-
    correo:'',
    //Define un objeto con estructura base para el formulario. Sirve tanto al crear como para resetear el estado.
  }
  let {id} = useParams(); // Extrae el parámetro `id` de la URL si estás en modo edición (ej. /edit/123).
  
  //useState es un hook que nos permite crear un estado en nuestro componente
  //El useState recibe un valor inicial y retorna un array con dos elementos
  //El primer elemento es el estado y el segundo es una funcion para actualizar el estado
  //El estado es un objeto que puede contener cualquier tipo de dato
  const[usuario, setUsuario] = useState(valorInicial) // Crea estado para guardar los datos del formulario.

  const [subId, setSubId] = useState(id??"");// tener en cuenta el ??"" Resolvio un erro 500
  //Garantiza que subId nunca será null/undefined - siempre será un string (aunque vacío)
  //Es más seguro para operaciones posteriores que esperan un string
  // subId será '' si id es undefined. Previene errores cuando el componente se monta sin parámetro.

// Declara una función llamada capturarDatos que manejará los cambios en los inputs del formulario
// Recibe el evento (e) como parámetro, que contiene información sobre la acción del usuario
const capturarDatos = (e) => { 
    
    // Desestructura el objeto event.target para obtener dos propiedades específicas:
    // - name: el atributo 'name' del input que generó el evento
    // - value: el valor actual del input que generó el evento
    const { name, value } = e.target;
    
    // Actualiza el estado 'usuario' usando el hook setUsuario:
    // 1. ...usuario: crea una copia de todas las propiedades del objeto usuario actual
    // 2. [name]: value: actualiza SOLAMENTE la propiedad cuyo nombre coincide con el 'name' del input
    //    usando notación de corchetes para usar el valor de 'name' como clave dinámica
    setUsuario({ ...usuario, [name]: value });
  // Actualiza el estado usuario al detectar un cambio en algún input. Usa desestructuración dinámica.  
  }

// Define una función asíncrona llamada guardarDatos para manejar el envío del formulario
const guardarDatos = async (e) => {
    // Previene el comportamiento por defecto del formulario (recarga de página)
    e.preventDefault();
        // Muestra en consola el objeto usuario con los datos actuales (para debugging)
    console.log(usuario);
    // Prepara los datos para enviar a la API:
    // Crea un nuevo objeto (newUser) extrayendo solo las propiedades necesarias del estado 'usuario'
    // Esto es buena práctica para no enviar datos innecesarios
    const newUser = {
      nombre: usuario.nombre,    // Obtiene el nombre del estado usuario
      apellido: usuario.apellido, // Obtiene el apellido
      edad: usuario.edad,        // Obtiene la edad
      telefono: usuario.telefono, // Obtiene el teléfono
      correo: usuario.correo     // Obtiene el correo
    };

    // Realiza una petición POST asíncrona al endpoint de la API:
    // 1. await: Espera a que la petición se complete antes de continuar
    // 2. axios.post: Método para enviar datos
    // 3. Primer parámetro: URL del endpoint
    // 4. Segundo parámetro: Objeto con los datos a enviar (newUser)
    await axios.post('http://localhost:4000/api/usuarios', newUser);
    
    // Muestra una alerta al usuario indicando éxito en la operación
    alert('Usuario creado exitosamente');
    
    // Resetea el formulario:
    // 1. setUsuario: Función para actualizar el estado
    // 2. {...valorInicial}: Copia todas las propiedades del objeto valorInicial
    //    (vuelve los campos del formulario a sus valores iniciales vacíos)
    setUsuario({ ...valorInicial });
};
 // Función asíncrona para actualizar un usuario existente mediante una petición PUT
const actualizarUser = async (e) => {
    // Previene el comportamiento por defecto del formulario (recarga de página)
    e.preventDefault();
    
    // Crea un objeto newUser con los datos actualizados del formulario
    const newUser = {
      nombre: usuario.nombre,    // Obtiene el nombre actualizado del estado
      apellido: usuario.apellido, // Obtiene el apellido actualizado
      edad: usuario.edad,        // Obtiene la edad actualizada
      telefono: usuario.telefono, // Obtiene el teléfono actualizado
      correo: usuario.correo     // Obtiene el correo actualizado
    };

    // Envía una petición PUT a la API para actualizar el usuario:
    // 1. La URL incluye el subId (ID del usuario a actualizar)
    // 2. newUser contiene los nuevos datos
    await axios.put(`http://localhost:4000/api/usuarios/${subId}`, newUser);
    
    // Muestra una alerta de éxito
    alert('Usuario actualizado exitosamente');
    
    // Resetea el estado del formulario:
    // 1. Vuelve a los valores iniciales vacíos
    setUsuario({ ...valorInicial });
    
    // 2. Limpia el ID del usuario que se estaba editando
    setSubId('');
};
//LOGICA PARA HACER UNA PETICION A LA API para que nos envie ese user en especifico gracias al id
const obtUno = async(valorId)=>{
const res = await axios.get('http://localhost:4000/api/usuarios/'+valorId)
setUsuario({// Actualiza el estado 'usuario' con los datos recibidos de la API:
  nombre:res.data.nombre, // Asigna el nombre del usuario desde la respuesta
  apellido:res.data.apellido,
  edad:res.data.edad,
  telefono:res.data.telefono,
  correo:res.data.correo,
  // Estos datos llenarán automáticamente los campos del formulario
        // cuando se haga clic en el botón "Editar" de un usuario
})
}
  useEffect(()=>{ // Este efecto se ejecuta cuando el valor de subId cambia
    if(subId !== ''){ // Verifica si subId no está vacío
      obtUno(subId) // Si hay un ID válido, llama a la función obtUno con ese ID
    }
},[subId]) // Dependencia: el efecto se ejecuta cuando subId cambia
  return (
    //Contenedor padre  o div padre
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <form onSubmit={guardarDatos}>
          {/*Esta línea de código establece el manejador de eventos para cuando se envía un formulario en React. */}
          <h2 className="text-center mb-3">Crear Usuario</h2>
          {/* Input: Nombre - Contenedor principal con margen inferior */}
          <div className="mb-3">{/* 'mb-3' añade un margen inferior (margin-bottom) */}
            {/* Etiqueta descriptiva del campo */}
            <label>Nombre:</label> {/* Texto que identifica el input */}
            {/* Campo de entrada de texto */}
            <input
              type="text" // Tipo de input (texto plano)
              className="form-control" // Clases de Bootstrap para estilizado
              placeholder="Ingrese su nombre de usuario" // Texto de ejemplo/guía
              required // Atributo HTML5 para validación obligatoria
              name="nombre" // Identificador para el manejo de datos
              value={usuario.nombre} // Valor controlado por React (del estado 'usuario')
              onChange={capturarDatos} // Manejador de cambios para actualizar el estado
            />
          </div>
          {/* Input: Apellido */}
          <div className="mb-3">
            <label>Apellido:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese su apellido de usuario"
              required
              name="apellido"
              value={usuario.apellido}
              onChange={capturarDatos}
            />
          </div>
          {/* Input: Edad */}
          <div className="mb-3">
            <label>Edad:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Ingrese la edad del usuario"
              required
              name="edad"
              value={usuario.edad}
              onChange={capturarDatos}
            />
          </div>
          {/* Input: telefono */}
          <div className="mb-3">
            <label>Telefono:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Ingrese el telefono del usuario"
              required
              name="telefono"
              value={usuario.telefono}
              onChange={capturarDatos}
            />
          </div>
          {/* Input: correo */}
          <div className="mb-3">
            <label>Correo:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese el correo del usuario"
              required
              name="correo"
              value={usuario.correo}
              onChange={capturarDatos}
            />
          </div>
          <button className="btn btn-primary form-control">
            Guardar Usuario
          </button>
        </form>
        {/* Formulario para actualizar usuario */}

        
<form onSubmit={actualizarUser}> {/* Cuando se envía el formulario, ejecuta la función actualizarUser */}
  
  {/* Botón de envío del formulario */}
  <button 
    className="btn btn-danger form-control mt-2" 
    type="submit" // Importante: indica que es el botón de envío
  >
    Actualizar Usuario
  </button>
  {/* 
    - 'btn btn-danger': Estilo de Bootstrap para botón rojo (peligro/acción importante)
    - 'form-control': Hace que el botón ocupe el ancho completo del contenedor
    - 'mt-2': Añade un margen superior (margin-top) de 0.5rem (~8px)
  */}

</form>
      </div>
    </div>
  );
}
export default CrearUsuarios
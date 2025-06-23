import React, {useEffect, useState}from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";
//Interfaz grafica de usuarios
const CrearUsuarios = () => {
  //Toda la logica de envio de datos se hara entre el const y el return
  const valorInicial ={
    nombre: '',
    apellido: '',
    edad: 0,  //efectivamente si genero error xD, Tener cuidado, si no guarda los datos es por que hay algo mal en el tipo de dato
    telefono:0 , //generara error? segun aqui espera un number pero al poner '' esperara un string -.-
    correo:'',
  }
  let {id} = useParams(); 
  
  //useState es un hook que nos permite crear un estado en nuestro componente
  //El useState recibe un valor inicial y retorna un array con dos elementos
  //El primer elemento es el estado y el segundo es una funcion para actualizar el estado
  //El estado es un objeto que puede contener cualquier tipo de dato
  const[usuario, setUsuario] = useState(valorInicial)

  const [subId, setSubId] = useState(id??"");// tener en cuenta el ??"" Resolvio un erro 500
  //Garantiza que subId nunca será null/undefined - siempre será un string (aunque vacío)
  //Es más seguro para operaciones posteriores que esperan un string

  const capturarDatos = (e)=>{ 
    const{name, value} = e.target
    setUsuario({...usuario, [name]: value})
  }

  const guardarDatos = async(e)=>{
    e.preventDefault()
    console.log(usuario)

    //Creacion de la logica para la peticion POST
    const newUser ={
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      edad: usuario.edad,
      telefono: usuario.telefono,
      correo: usuario.correo

    }
    await axios.post('http://localhost:4000/api/usuarios', newUser)
    alert('Usuario creado exitosamente')
    setUsuario({...valorInicial})
  }
  //FUNCION PARA ACTUALIZAR EL USUARIO PUT
  const actualizarUser = async(e)=>{
    e.preventDefault()
    const newUser ={
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      edad: usuario.edad,
      telefono: usuario.telefono,
      correo: usuario.correo
    }
    await axios.put('http://localhost:4000/api/usuarios/'+subId, newUser)
    alert('Usuario actualizado exitosamente')
    setUsuario({...valorInicial})
    setSubId('')
  }
//LOGICA PARA HACER UNA PETICION A LA API para que nos envie ese user en especifico gracias al id
const obtUno = async(valorId)=>{
const res = await axios.get('http://localhost:4000/api/usuarios/'+valorId)
setUsuario({
  nombre:res.data.nombre,
  apellido:res.data.apellido,
  edad:res.data.edad,
  telefono:res.data.telefono,
  correo:res.data.correo,
})
}
  useEffect(()=>{
    if(subId !== ''){
      obtUno(subId)
    }
},[subId])
  return (
    //Contenedor padre  o div padre
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <form onSubmit={guardarDatos}>
          <h2 className="text-center mb-3">Crear Usuario</h2>
          <div className="mb-3">
            <label>Nombre:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese su nombre de usuario"
              required
              name="nombre"
              value={usuario.nombre}
              onChange={capturarDatos}
            />
          </div>
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
        <form onSubmit={actualizarUser}>
          <button className="btn btn-danger form-control mt-2">
            Actualizar Usuario
          </button>
        </form>
      </div>
    </div>
  );
}
export default CrearUsuarios
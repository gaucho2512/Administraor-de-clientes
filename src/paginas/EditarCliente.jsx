import React from 'react'
import Formulario from '../components/Formulario'
import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

const EditarCliente = () => {

  const {id} = useParams()

  const [ cliente , setCliente] = useState({})
  const [ cargando , setCargando] = useState(false)

  useEffect( () => {
      setCargando(true)
      const obtenerClienteApi = async () => {
         try {
          const url = `http://localhost:4000/clientes/${id}`
          const respuesta = await fetch(url)
          const resultado = await respuesta.json()
          setCliente(resultado)
         } catch (error) {
             console.log(error);
         }

         setCargando(false)
      }

          obtenerClienteApi()
        
  }, [])

  return (
    <>
    <div>
       <h2 className='nuevo-cliente'>EDITAR CLIENTE</h2>
       <p className='llenar-los-campos'>Llena los siguientes campos para editar un cliente</p>
    </div>

    {cliente?.nombre ? (
      <div className='contenedor-formulario'>
      <Formulario
        cliente={cliente}
        cargando={cargando}
      />
  </div>
    ) : <p className='sin-resultado'> CLIENTE O ID NO VALIDO</p>}

    
   
    
    
    </>
  )
}

export default EditarCliente
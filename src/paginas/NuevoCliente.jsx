import React from 'react'
import Formulario from '../components/Formulario'

const NuevoCliente = () => {
  return (
       <>
       <div>
          <h2 className='nuevo-cliente'>NUEVO CLIENTE</h2>
          <p className='llenar-los-campos'>Llena los siguientes campos para registrar un cliente</p>
       </div>

       <div className='contenedor-formulario'>
           <Formulario />
       </div>
      
       
       
       </>
  )
}

export default NuevoCliente
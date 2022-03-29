import {useEffect, useState, } from 'react'
import Cliente from '../components/Cliente'



const Inicio = () => {

    const [clientes , setClientes] = useState([])

    useEffect( () => {
      const obtenerClientesApi = async () => {
         try {
           const urlApi = "http://localhost:4000/clientes"
           const respuesta = await fetch(urlApi)
           const resultado = await respuesta.json()
           setClientes(resultado);
         } catch (error) {
           console.log(error);
         }
      }
          obtenerClientesApi()
    }, [] )

    const handleSubmit = async (id) => {
    
             try {
               const url = `http://localhost:4000/clientes/${id}`
               const respuesta = await fetch(url, {
                 method: 'DELETE'
               })
               const resultado = await respuesta.json()
               const arrayClientes = clientes.filter( cliente => cliente.id !== id)
               setClientes(arrayClientes)
             } catch (error) {
               console.log(error);
             }
          }
      
    

  return (
     <>
      <div>
          <h2 className='nuevo-cliente'>CLIENTES</h2>
          <p className='llenar-los-campos'>Administra tus clientes</p>
       </div>

       <div className='contenedor-formulario'>
          <table className='table table-dark table-hover table-table'>

             <thead className='thead-table'>
                  <tr>
                    <th scope="col" >Nombre</th>
                    <th scope="col" >Contacto</th>
                    <th scope="col" >Empresa</th>
                    <th scope="col" >Acciones</th>
                  </tr>
             </thead>

             <tbody>
                  { clientes.map( cliente => (
                    <Cliente 
                        key={cliente.id}
                        cliente= {cliente}
                        handleSubmit={handleSubmit}
                    />
                  ) ) }
             </tbody>

          </table>
       </div>

     </>
  )
}

export default Inicio
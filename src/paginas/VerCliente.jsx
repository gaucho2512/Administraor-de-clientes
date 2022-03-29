import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'


const VerCliente = () => {

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
      cargando ? <p>Cargando...</p> :  Object.keys(cliente).length === 0 ? <p className='sin-resultado'>NO HAY NINGUN RESULTADO.</p> : (


      <> 

       <div>
          <h2 className='nuevo-cliente'>VER CLIENTE</h2>
          <p className='llenar-los-campos'>Informacion completa del cliente.</p>
       </div>

        <div className='contenedor-ver-clientes'>
              <p className='parrafo-ver-cliente'>
                <span className='span-ver-cliente'> Cliente : </span>
                {cliente.nombre}
              </p>

              <p>
                <span className='span-ver-cliente'> E-mail : </span>
                {cliente.email}
              </p>

              <p>
                <span className='span-ver-cliente'> Telefono : </span>
                {cliente.telefono}
              </p>

              <p>
                <span className='span-ver-cliente'> Empresa : </span>
                {cliente.empresa}
              </p>

              { cliente.notas && (
                  <p>
                    <span className='span-ver-cliente'> Notas : </span>
                    {cliente.notas}
                  </p>
              )}
        </div>
        </>
      )

       
   
  )
}

export default VerCliente
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cliente = ({cliente , handleSubmit}) => {

    const navigate = useNavigate()

    const { nombre, empresa, email, telefono , notas , id } = cliente

  return (
       <>
        <tr>
            <td className='td-cliente'>{nombre}</td>

            <td>
                 <p><span>Email : </span> {email} </p> 
                 <p><span>Tel : </span> {telefono} </p> 
            </td>

            <td>{empresa}</td>

            <td> 

            <button
             type='button'
             className='btn btn-warning'
             onClick={ () => navigate(`/clientes/${id}`) }
             >Ver</button>
            
            <button
             type='button'
             className='btn btn-primary'
             onClick={ () => navigate(`/clientes/editar/${id}`)}
             >Editar</button>

             <button
             type='button'
             className='btn btn-danger'
             onClick={ () => handleSubmit(id)}
             >Eliminar</button>
             </td>
            
        </tr>
       
       </>
  )
}

export default Cliente
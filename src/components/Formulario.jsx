import React from 'react'
import { Formik , Form , Field } from 'formik'
import { useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'

const Formulario = ({cliente , cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                   .min(3, "El nombre es muy corto")
                   .max(30, "El nombre es muy largo")
                   .required('El nombre del cliente es obligatorio'),

        empresa: Yup.string()
                    .required('El nombre de la empresa es obligatorio'),

        email: Yup.string()
                    .email("E-mail no valido")
                    .required('El e-mail es obligatorio'),

        telefono: Yup.number()
                     .positive("El numero no es valido")
                     .integer("El numero no es valido")
                     .typeError("El numero de telefono no es valido")
       
    })



    const handleSubmit = async (values) => {
        try {
           if(cliente.id) {
              // editando registro
              const url = `http://localhost:4000/clientes/${cliente.id}`
            const  respuesta = await fetch(url, {

                    method: "PUT",
                    body: JSON.stringify(values),
                    headers: {
                          "Content-Type" : "application/json"
                     }
                 })
                    const  resultado = await respuesta.json()
                    console.log(resultado);
                    navigate('/clientes')
           
           } else {
              // creando registro
            const url = "http://localhost:4000/clientes"
            const  respuesta = await fetch(url, {

                    method: "POST",
                    body: JSON.stringify(values),
                    headers: {
                          "Content-Type" : "application/json"
                     }
                 })
                    const  resultado = await respuesta.json()
                    console.log(resultado);
                    navigate('/clientes')
           }
                    
        } catch (error) {
            console.log(error);
        }
    } 
  return (

    cargando ? 'Cargando...' : ( 
    <>
        <div className='conteneiner-form'>
            <h1> {cliente?.nombre ? 'EDITAR CLIENTE' : 'AGREGAR CLIENTE' }</h1>

            {/* en formik usa un useState de su api y se declara todo adentro de la etiqueta formik */}
            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? ''

                }}

                enableReinitialize={true}

                onSubmit={ async (values , {resetForm}) => {
                  await  handleSubmit(values)

                  resetForm()

                } }

                validationSchema = {nuevoClienteSchema}
            
            > 

           {  ({errors , touched}) => { 

                return  ( 

                <Form className='form-principal'>
                    <div>
                        <label
                         className='label-form'
                         htmlFor="nombre"
                         >
                         Nombre
                         </label>

                        <Field
                        className="field-form"
                        id="nombre"
                        placeholder="Nombre del cliente"
                        type="text"
                        name="nombre"
                        />

                        { errors.nombre && touched.nombre ? 
                             <Alerta> {errors.nombre} </Alerta>
                             : null
                        }
                       
                    </div>

                    <div>
                        <label
                         className='label-form'
                         htmlFor="empresa"
                         >
                         Empresa
                         </label>
                         
                        <Field
                        className="field-form"
                        id="empresa"
                        placeholder="Empresa del cliente"
                        type="text"
                        name="empresa"
                        />

                            { errors.empresa && touched.empresa ? 
                             <Alerta> {errors.empresa} </Alerta>
                             : null
                        }
                        
                    </div>

                    <div>
                        <label
                         className='label-form'
                         htmlFor="email"
                         >
                         E-mail
                         </label>
                         
                        <Field
                        className="field-form"
                        id="email"
                        placeholder="Email del cliente"
                        type="email"
                        name="email"
                        />

                            { errors.email && touched.email ? 
                             <Alerta> {errors.email} </Alerta>
                             : null
                            }

                    </div>

                    <div>
                        <label
                         className='label-form'
                         htmlFor="telefono"
                         >
                        Telefono
                         </label>
                         
                        <Field
                        className="field-form"
                        id="telefono"
                        placeholder="Telefono del cliente"
                        type="tel"
                        name="telefono"
                        />

                           { errors.telefono && touched.telefono ? 
                             <Alerta> {errors.telefono} </Alerta>
                             : null
                            }

                    </div>

                    <div>
                        <label
                         className='label-form'
                         htmlFor="notas"
                         >
                        Notas
                         </label>
                         
                        <Field
                        as="textarea"
                        className="field-form textarea-form"
                        id="notas"
                        placeholder="Notas del cliente"
                        type="text"
                        name="notas"
                        />

                        <input
                         type="submit"
                         className='submit-form btn btn-primary w-100'
                         value={ cliente?.nombre ? 'Editar cliente' : 'Agregar cliente'}
                          />


                    </div>
                   
                </Form>

             )} } 

            </Formik>



        </div>

        
    </>
    )
  )
}

Formulario.defaultProps = {
    cliente: {}
}

export default Formulario
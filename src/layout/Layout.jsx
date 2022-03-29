import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout = () => {

    // Hook para resaltar en link con un color
    const location = useLocation()
    const urlActual = location.pathname

  return (
      <>

        <div className="row">
            <div className="col-md-3 contenedor-left">
                <div className="box-left">
                    <h1>CRM - CLIENTES</h1>
                </div>
                    <nav className='link-clientes'>
                        <Link className={ ` ${urlActual === '/clientes' ? 'active' : 'link-link'}   `}  to="/clientes">Clientes</Link>
                        <Link className={ ` ${urlActual === '/clientes/nuevo' ? 'active' : 'link-link'}   `} to="/clientes/nuevo">Nuevo Cliente</Link>
                     </nav>
            </div>

            <div className="col-md-9 contenedor-right">
                <div className="box-right">
                    <Outlet />
                </div>
            </div>
        </div>

       

       </>
  )
}

export default Layout
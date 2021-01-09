import { Routes } from 'constantes'
import React from 'react'
import { Nav} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

import './admin-sidebar-styles.css'

const SideBarOptions : Array<{title: string, link: string}> =
[
    {title: 'Menu Principal', link: Routes.adminHome},
    {title: 'Reporte de ventas', link: Routes.adminSalesReport},
    {title: 'Reporte de clientes', link: Routes.adminCustomerManagement},
    {title: 'Gestión de pedidos', link: Routes.adminOrdersManagement},
    {title: 'Gestión del sistema', link: Routes.adminSystemManagement},
]

export const AdminSideBar = () => {

    const history = useHistory()

    return (
        <Nav activeKey={history.location.pathname} className="admin-sidebar--container">
            {
                SideBarOptions.map( ({title, link}, idx) => 
                    <Nav.Link key={idx} eventKey={link} onClick={()=>history.push(link)} >{title}</Nav.Link>
                )
            }
        </Nav>
    )
}

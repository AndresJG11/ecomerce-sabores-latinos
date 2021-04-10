import {VFC} from 'react'
import SalesReport from 'assets/icons/sales-report.png'
import OrderReport from 'assets/icons/order-report.png'
import Monitoring from 'assets/icons/monitoring.png'
import Computer from 'assets/icons/computer.png'
import { CardAdminLP } from '../card/CardAdminLP'

import './wrapper-card-adminLP.css'
import { CardAdminLPProps } from '../card/CardAdminLPProps'
import { Routes } from 'constantes'

const items : Array<CardAdminLPProps> = [
    { title: 'Reporte Ventas', icon: SalesReport, to: Routes.adminSalesReport},
    { title: 'Gestion de pedidos', icon: OrderReport, to: Routes.adminOrdersManagement},
    { title: 'Gestión del sistema', icon: Monitoring, to: Routes.adminSystemManagement},
    { title: 'Gestión de la página', icon: Computer, to: Routes.adminPageManagement},
]

export const WrapperCardAdminLP : VFC = () => {
    return (
        <div className="d-flex w-100 justify-content-center flex-wrap h-50">
            {
                items.map( item =>  
                    <CardAdminLP {...item} />
                )
            }
        </div>
    )
}

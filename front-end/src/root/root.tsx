
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Routes } from '../constantes'
import {
    HomePage, CategoryDetail, NavBar, Contacto,
    Nosotros, Carrito, Footer, UserLayout, PageNotFound
} from 'views'
import { 
    AdminLogin, AdminLadingPage, AdminLayout, 
    SalesReport, AdminCustomerManagement, OrdersManagement, 
    AdminSystemManagement } from 'admin'

import 'assets/styles/global.css'
import 'fonts.css'

export const Root = () => {

    return (
        <>
            <Switch>
                <Route path={Routes.admin} component={() =>
                    <AdminLayout>
                        <Route exact path={Routes.admin} component={AdminLogin} />
                        <Route exact path={Routes.adminHome} component={AdminLadingPage} />
                        <Route exact path={Routes.adminSalesReport} component={SalesReport} />
                        <Route exact path={Routes.adminCustomerManagement} component={AdminCustomerManagement} />
                        <Route exact path={Routes.adminOrdersManagement} component={OrdersManagement} />
                        <Route exact path={Routes.adminSystemManagement} component={AdminSystemManagement} />
                    </AdminLayout>

                } />
                <Route path={Routes.homePage} component={() =>
                    <UserLayout>
                        <Route exact path={Routes.homePage} component={HomePage} />
                        <Route exact path={Routes.detailCategory} component={CategoryDetail} />
                        <Route exact path={Routes.carrito} component={Carrito} />
                        <Route exact path={Routes.contacto} component={Contacto} />
                        <Route exact path={Routes.nosotros} component={Nosotros} />
                    </UserLayout>
                } />
            </Switch>
        </>
    )
}


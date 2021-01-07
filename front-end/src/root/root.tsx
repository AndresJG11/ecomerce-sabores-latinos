
import React from 'react'
import {Switch, Route, useLocation} from 'react-router-dom'
import {Routes} from '../constantes'
import { 
    HomePage, CategoryDetail, NavBar, Contacto, 
    Nosotros, Carrito, Footer } from 'views'


import 'assets/styles/global.css'
import 'fonts.css'
import { AdminLogin } from 'admin'

export const Root = () => {

    const {pathname} = useLocation()
    return (
        <> 
            { !pathname.includes(Routes.admin) && <NavBar />}
            <Switch>
                <Route exact path = {Routes.homePage} component = {HomePage} />
                <Route exact path = {Routes.detailCategory} component = {CategoryDetail} />
                <Route path = {Routes.carrito} component={Carrito} />
                <Route path = {Routes.contacto} component={Contacto} />
                <Route path = {Routes.nosotros} component={Nosotros} />
                <Route path = {Routes.admin} component={AdminLogin} />
            </Switch>
            { !pathname.includes(Routes.admin) && <Footer />}
        </>
    )
}


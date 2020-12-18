
import React from 'react'
import {Switch, Route} from 'react-router-dom'
import { HomePage, CategoryDetail, NavBar, Contacto, Nosotros, Carrito } from 'views'
import {Routes} from '../constantes'

import 'assets/styles/global.css'
import 'fonts.css'

export const Root = () => {
    return (
        <> 
            <NavBar />
            <Switch>
                <Route exact path = {Routes.homePage} component = {HomePage} />
                <Route exact path = {Routes.detailCategory} component = {CategoryDetail} />
                <Route path = {Routes.carrito} component={Carrito} />
                <Route path = {Routes.contacto} component={Contacto} />
                <Route path = {Routes.nosotros} component={Nosotros} />
            </Switch>
        </>
    )
}


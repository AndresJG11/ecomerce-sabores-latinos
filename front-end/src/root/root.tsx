
import React from 'react'
import {Switch, Route} from 'react-router-dom'
import { HomePage } from 'views'
import { ProductDetail } from 'views/category-detail'
import {Routes} from '../constantes'

export const Root = () => {
    return (
        <Switch>
            <Route exact path = {Routes.homePage} component = {HomePage} />
            <Route path = {Routes.detailCategory} component={ProductDetail} />
        </Switch>
    )
}


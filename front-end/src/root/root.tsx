
import React from 'react'
import {Switch, Route} from 'react-router-dom'
import { HomePage } from 'views'
import {Routes} from '../constants'

export const Root = () => {
    return (
        <Switch>
            <Route path = {Routes.homePage} >
                <HomePage />
            </Route>
        </Switch>
    )
}


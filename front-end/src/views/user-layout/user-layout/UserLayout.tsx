import {FC} from 'react'
import { NavBar, Footer } from 'views'

export const UserLayout : FC<{children : any}> = ({children}) => {
    return (
        <>
            <NavBar />

            {children}  
            
            <Footer/>  
        </>
    )
}

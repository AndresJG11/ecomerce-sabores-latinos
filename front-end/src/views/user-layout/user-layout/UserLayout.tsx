import {FC} from 'react'
import { NavBar } from 'views'

export const UserLayout : FC<{children : any}> = ({children}) => {
    return (
        <>
            <NavBar />

            {children}  
            
            {/* <Footer/>   */}
        </>
    )
}

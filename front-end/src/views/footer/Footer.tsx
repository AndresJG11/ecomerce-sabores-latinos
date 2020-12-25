import { Routes } from 'constantes'
import { Link } from 'react-router-dom'
import './footer-styles.css'

export const Footer = () => {
    return (
        <div className="bg-white">
           <ul className="footer-items"> 
                <li> Términos y condiciones </li> 
                <Link className="no-link" to={Routes.contacto}> <li> Contacto </li> </Link>
                <Link className="no-link" to={Routes.nosotros}> <li> Nosotros </li> </Link>
                <Link className="no-link" to={Routes.carrito}> <li> Mi carrito de compras </li> </Link>
           </ul>
        </div>
    )
}

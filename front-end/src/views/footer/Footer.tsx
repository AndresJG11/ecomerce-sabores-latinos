import { Routes } from 'constantes'
import { Link } from 'react-router-dom'
import FacebokLogo from 'assets/icons/facebook.svg'
import WhatsappLogo from 'assets/icons/whatsapp.svg'
import './footer-styles.css'

export const Footer = () => {
    return (
        <footer>
           <ul className="footer-items"> 
                <li> Términos y condiciones </li> 
                
                <div>
                    <Link className="no-link" to={Routes.contacto}> <li> Contacto </li> </Link>
                    <div>
                        <img className="contact-icon" src={FacebokLogo} alt=""/>
                        <img className="contact-icon" src={WhatsappLogo} alt=""/>
                    </div>
                </div>
                
                <Link className="no-link" to={Routes.nosotros}> <li> Nosotros </li> </Link>
                <Link className="no-link" to={Routes.carrito}> <li> Mi carrito de compras </li> </Link>
           </ul>
        </footer>
    )
}

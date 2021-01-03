import { Routes } from 'constantes'
import { Link } from 'react-router-dom'
import FacebokLogo from 'assets/icons/facebook.svg'
import WhatsappLogo from 'assets/icons/whatsapp.svg'
import InstagramLogo from 'assets/icons/instagram.svg'
import './footer-styles.css'

export const Footer = () => {
    return (
        <footer className="pb-5 bg-white">
           <ul className="footer-items"> 
                <li> Ayuda</li> 
                <li> Términos y condiciones </li> 
                
                <div className="d-flex justify-content-center flex-column">
                    <Link className="no-link text-center" to={Routes.contacto}> <li> Contacto </li> </Link>
                    <div className="d-flex justify-content-center">
                        <img className="contact-icon mx-3" src={FacebokLogo} alt=""/>
                        <img className="contact-icon mx-3" src={WhatsappLogo} alt=""/>
                        <img className="contact-icon mx-3" src={InstagramLogo} alt=""/>
                    </div>
                </div>
                
                <Link className="no-link" to={Routes.nosotros}> <li> Nosotros </li> </Link>
                <Link className="no-link" to={Routes.carrito}> <li> Mi carrito de compras </li> </Link>
           </ul>
        </footer>
    )
}

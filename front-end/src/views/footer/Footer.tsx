import './footer-styles.css'
import { useEffect } from 'react'
import { Routes } from 'constantes'
import { Link } from 'react-router-dom'
import FacebokLogo from 'assets/icons/facebook.svg'
import WhatsappLogo from 'assets/icons/whatsapp.svg'
import InstagramLogo from 'assets/icons/instagram.svg'
import { useDispatch, useSelector } from 'react-redux'
import { Sistema } from 'models/System'
import SistemaAction from 'stores/sistema/sistemaAction'


export const Footer = () => {

    const dispatch = useDispatch()

    const sistema: Sistema = useSelector((state: any) => state.SistemaReducer.parametrosSistema);

    useEffect(() => {
        dispatch(SistemaAction.requestObtenerSistema())
    }, [dispatch]);

    return (
        <footer className="pb-5 bg-white">
           <ul className="footer-items"> 
                <li> Ayuda</li> 
                <li> Términos y condiciones </li> 
                
                <div className="d-flex justify-content-center flex-column">
                    <Link className="no-link text-center" to={Routes.contacto}> <li> Contacto </li> </Link>
                    <div className="d-flex justify-content-center">
                        <img className="contact-icon mx-3" src={FacebokLogo} alt="" onClick={() => window.open( sistema.facebook )} />
                        <img className="contact-icon mx-3" src={WhatsappLogo} alt="" onClick={() => window.open(`https://api.whatsapp.com/send?phone=${sistema.whatsapp}&text=Hola!`) }/>
                        <img className="contact-icon mx-3" src={InstagramLogo} alt="" onClick={() => window.open( sistema.instagram )} />
                    </div>
                </div>
                
                <Link className="no-link" to={Routes.nosotros}> <li> Nosotros </li> </Link>
                <Link className="no-link" to={Routes.carrito}> <li> Mi carrito de compras </li> </Link>
           </ul>
        </footer>
    )
}

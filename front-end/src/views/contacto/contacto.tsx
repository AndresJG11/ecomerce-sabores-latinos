import './contacto-styles.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Sistema } from 'models/System'
import FacebokLogo from 'assets/icons/facebook.svg'
import WhatsappLogo from 'assets/icons/whatsapp.svg'
import InstagramLogo from 'assets/icons/instagram.svg'
import SistemaAction from 'stores/sistema/sistemaAction'

export const Contacto = () => {

    const dispatch = useDispatch()

    const sistema: Sistema | null = useSelector((state: any) => state.SistemaReducer.parametrosSistema);

    useEffect(() => {
        dispatch(SistemaAction.requestObtenerSistema())
    }, [dispatch]);

    return (
        <>
            <div className="header-contacto">
                <div className="header-texto">
                    <h1> Contáctanos </h1>
                    <h4> Estaremos encantados de ayudarte </h4>
                </div>
            </div>
            <div className="container">
                <div className="container-metodos-contacto">
                    {
                        sistema?.telefono &&
                        <div className="metodo-contacto" >
                            <h5> Teléfono </h5>
                            <span> {sistema.telefono} </span>
                        </div>
                    }
                    {
                        sistema?.direccion &&
                        <div className="metodo-contacto" >
                            <h5> Dirección </h5>
                            <span> {sistema.direccion} </span>
                        </div>
                    }
                    {
                        (sistema?.facebook || sistema?.whatsapp || sistema?.instagram) &&
                        <div className="contacto-redes" >
                            <h5>Nuestras Redes Sociales</h5>
                            <div className="contacto-redes-wrapper">
                                {
                                    sistema?.facebook &&
                                    <a href={sistema.facebook} target="_blank" rel="noreferrer" className="contacto-red-social" >
                                        <img src={FacebokLogo} alt="" />
                                    </a>
                                }
                                {
                                    sistema?.whatsapp &&
                                    <a href={`https://api.whatsapp.com/send?phone=${sistema.whatsapp}&text=Hola!`} target="_blank" rel="noreferrer" className="contacto-red-social" >
                                        <img src={WhatsappLogo} alt="" />
                                    </a>
                                }
                                {
                                    sistema?.instagram &&
                                    <a href={sistema.instagram} target="_blank" rel="noreferrer" className="contacto-red-social" >
                                        <img src={InstagramLogo} alt="" />
                                    </a>
                                }
                            </div>
                        </div>
                    }
                    {
                        sistema?.correo &&
                        <div className="metodo-contacto">
                            <h5>Correo Electrónico</h5>
                            <span className="d-block text-center"> {sistema.correo} </span>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

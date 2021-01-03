import { Routes } from "constantes"
import { CategoriesList } from "models"
import { useEffect, useState } from "react"
import { Nav, Navbar, NavDropdown } from "react-bootstrap"
import { getCategories } from "services"
import { Link, useHistory, useLocation } from 'react-router-dom'
import SaboresLatinosIcono from 'assets/icons/icono_sabores_latinos.png'

import './navbar-styles.css'

const {
    Brand,
} = Navbar

const {
    Item
} = NavDropdown

export const NavBar = () => {

    const listaTitulos = [
        {titulo: 'Nosotros', url: Routes.nosotros},
        {titulo: 'Contacto', url: Routes.contacto},
        {titulo: 'Carrito', url: Routes.carrito},
    ]

    const [listaCategorias, setListaCategorias] = useState<CategoriesList | null>(null)

    const {push} = useHistory();

    const location = useLocation();

    useEffect(() => {
        setListaCategorias( getCategories()  )
    }, []);

    return (
        <Navbar expand="lg" className="navbar--yellow">

            <Link to={Routes.homePage} className="no-link">
                <Brand> <img src={SaboresLatinosIcono} alt="" style={{width:50}}/> Sabores Latinos  </Brand>
            </Link>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
            
                <Nav className="mr-auto">

                {
                    listaTitulos.map( ({titulo, url}) =>
                        <Nav.Link id="basic-navbar-nav" className={location.pathname === url ? 'active' : ''} key={titulo} onClick = {() => push(url) } >  {titulo}  </Nav.Link>
                    
                )}
                        <NavDropdown title="Categorías" id="basic-nav-dropdown">
                            {
                                listaCategorias?.categories.map( ({nombre, idCategoria}) => 
                                    <Item as='span' key={idCategoria}> <Link className="no-link" to={Routes.detailCategory.replace(':id', idCategoria.toString())}>  {nombre} </Link> </Item>  )
                            }
                        </NavDropdown>
                </Nav>
    
                </Navbar.Collapse>

        </Navbar>
    )
}

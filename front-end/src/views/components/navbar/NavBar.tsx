import { Routes } from "constantes"
import { Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link, useHistory, useLocation } from 'react-router-dom'
import SaboresLatinosIcono from 'assets/icons/icono_sabores_latinos.png'
import ShoppingCart from 'assets/icons/shopping-cart.svg'
import { CategoriaListItem } from "models"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import CategoriasAction from "stores/categorias/categoriasAction"

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

    const listaCategorias : CategoriaListItem = useSelector((state: any) => state.CategoriasReducer.listaCategorias);

    const {push} = useHistory();

    const location = useLocation();

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(CategoriasAction.requestObtenerCategoriasLista())
      // eslint-disable-next-line
    }, []);

    return (
        <Navbar expand="lg" className="navbar--yellow">

            <Link to={Routes.homePage} className="no-link">
                <Brand> <img src={SaboresLatinosIcono} alt="" style={{width:50}}/> Sabores Latinos  </Brand>
            </Link>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
            
                <Nav className="mr-auto w-100">
                    {
                        listaTitulos.map( ({titulo, url}) =>
                            <Nav.Link id="basic-navbar-nav" className={location.pathname === url ? 'active' : ''} key={titulo} onClick = {() => push(url) } >  {titulo}  </Nav.Link>
                        
                    )}
                        <NavDropdown title="Categorías" id="basic-nav-dropdown">
                            {
                                listaCategorias?.categorias && listaCategorias.categorias.map( ({nombre, idCategoria} ) => 
                                    <Item 
                                        as='span' 
                                        key={idCategoria}
                                    > 
                                        <Link 
                                            className="no-link" 
                                            to={Routes.detailCategory.replace(':idCategory', idCategoria.toString())}
                                        >  
                                            {nombre} 
                                        </Link> 
                                    </Item>  
                                )
                            }
                        </NavDropdown>
                        <Nav.Link id="basic-navbar-nav" className="navbar-shopping-cart--wrapper" onClick = {() => push(Routes.carrito) } >
                            <img src={ShoppingCart} alt="" className="navbar-shopping-cart--icon"/>
                        </Nav.Link>
                </Nav>
    
                </Navbar.Collapse>

        </Navbar>
    )
}

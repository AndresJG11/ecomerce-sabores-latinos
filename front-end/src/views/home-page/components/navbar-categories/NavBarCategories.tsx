import { useEffect } from "react"
import { Routes } from 'constantes';
import { CategoriaListItem } from 'models';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoriasAction from "stores/categorias/categoriasAction"
import './navbar-categories.css'

export const NavBarCategories = () => {

    const listaCategorias : CategoriaListItem = useSelector((state: any) => state.CategoriasReducer.listaCategorias);

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(CategoriasAction.requestObtenerCategoriasLista())
    }, [dispatch]);

    return (
        <div className="category-navbar d-flex flex-row justify-content-around">
            {
                listaCategorias?.categorias && listaCategorias.categorias.map( category  =>
                    <Link 
                        to={`${Routes.detailCategory.replace(':idCategory', category.idCategoria.toString())}` } 
                        style={{textDecoration: 'none'}} 
                        key={category.idCategoria}
                    >
                        <div className="category-navbar-item d-flex flex-column justify-content-center align-items-center btn">
                            <img src={category.icono} alt={`${category.nombre} icon`} className="category-navbar-item--icon" />
                            <p className="category-navbar-item--text" > {category.nombre} </p>
                        </div>
                    </Link>
            )}
        </div>
    )
}

import { Routes } from 'constantes';
import { CategoriaListItem } from 'models';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './navbar-categories.css'

export const NavBarCategories = () => {

    const listaCategorias : Array<CategoriaListItem> = useSelector((state: any) => state.CategoriasReducer.listaCategorias);

    return (
        <div className="category-navbar d-flex flex-row justify-content-around">
            {
                listaCategorias && listaCategorias.map((category : CategoriaListItem) =>
                    <Link 
                        to={`${Routes.detailCategory.replace(':id', category.idCategoria.toString())}` } 
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

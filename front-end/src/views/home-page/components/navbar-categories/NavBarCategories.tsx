import { Routes } from 'constantes';
import { CategoriesList } from 'models';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { CategoriesServices } from 'services';
import './navbar-categories.css'

export const NavBarCategories = () => {

    const [categories, setCategories] = useState<CategoriesList | null>(null);

    useEffect(() => {
        setCategories(CategoriesServices.getCategories());
    }, []);

    return (
        <div className="category-navbar-item d-flex flex-row justify-content-around">
            {categories?.categories.map((category) =>
            <Link to={`${Routes.detailCategory.replace(':id', category.idCategoria.toString())}` } style={{textDecoration: 'none'}} key={category.idCategoria}>
                <div className="d-flex flex-column justify-content-center align-items-center btn">
                    <img src={category.icono} alt={`${category.nombre} icon`} className="category-navbar-item--icon" />
                    <p className="category-navbar-item--text" > {category.nombre} </p>
                </div>
            </Link>
            )}
        </div>
    )
}

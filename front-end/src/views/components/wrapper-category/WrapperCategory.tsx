import { CategoriesSlider } from "../categories-slider"
import {FC} from 'react'

import './wrapper-category-styles.css'

export const WrapperCategory : FC<any> = ({title, productos, idCategoria}) => {

    const numProductos = window.mobileCheck() ? 4 : productos?.length || 0;

    const arrayProductos = productos && productos.slice(0, numProductos)

    return (
        <div className="my-4">
            <h3 className="category-title"> {title} </h3>
            <CategoriesSlider productos={arrayProductos} idCategoria={idCategoria} /> 
        </div>
    )
}

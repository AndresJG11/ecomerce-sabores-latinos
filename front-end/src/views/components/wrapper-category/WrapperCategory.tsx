import { CategoriesSlider } from "../categories-slider"
import {FC} from 'react'

import './wrapper-category-styles.css'

export const WrapperCategory : FC<any> = ({title}) => {



    return (
        <div className="my-4">
            <h3 className="category-title"> {title} </h3>
            <CategoriesSlider /> 
        </div>
    )
}

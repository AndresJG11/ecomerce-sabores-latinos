import { FC } from 'react'
import { Card } from 'react-bootstrap'
import PriceTag from 'assets/icons/price-tag.svg'

import './category-card-styles.css'
import { Link } from 'react-router-dom'
import { Routes } from 'constantes'

interface CategoryCardProps {

    readonly image : string, 
    readonly nombre : string, 
    readonly precio : number, 

}

const { Img, Title, Body } = Card

export const CategoryCard : FC<CategoryCardProps> = ({image, nombre, precio}) => {
    return (
        <Link to={Routes.carrito} className="no-link" >
            <Card className="tarjeta-producto">
                <Img src={image} variant="top" />
                <Body>
                    <Title>{nombre}</Title>
                    <div className="tarjeta-producto--precio">
                        <span>{precio}$ CL</span>
                        <img style={{width:30}} alt="price tag" src={PriceTag} />
                    </div>
                </Body>
            </Card>
        </Link>
    )
}

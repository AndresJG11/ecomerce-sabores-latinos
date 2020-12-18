import { FC } from 'react'
import { Card } from 'react-bootstrap'
import PriceTag from 'assets/icons/price-tag.svg'

import './category-card-styles.css'
import { Link } from 'react-router-dom'
import { Routes } from 'constantes'

interface CategoryCardProps {

    readonly image : string, 
    readonly title : string, 
    readonly text : string, 
    readonly price : number, 

}

const { Img, Title, Body, Text } = Card

export const CategoryCard : FC<CategoryCardProps> = ({image, title, text, price}) => {
    return (
        <Link to={Routes.carrito} className="no-link" >
            <Card className="tarjeta-producto">
                <Img src={image} variant="top" />
                <Body>
                    <Title>{title}</Title>
                    <Text>{text}</Text>
                <div className="tarjeta-producto--precio">
                    <span>{price}$ CL</span>
                    <img style={{width:30}} alt="price tag" src={PriceTag} />
                </div>
                </Body>
            </Card>
        </Link>
    )
}

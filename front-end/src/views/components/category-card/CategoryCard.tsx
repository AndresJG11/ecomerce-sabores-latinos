import { FC } from 'react'
import { Card } from 'react-bootstrap'
import PriceTag from 'assets/icons/price-tag.svg'
import { Link } from 'react-router-dom'
import { Routes } from 'constantes'
import './category-card-styles.css'
import { imagesURL } from 'environments/base'

interface CategoryCardProps {

    readonly nombre : string 
    readonly precio :  number
    readonly imagenes : Array<any>
    readonly idProducto : number
    readonly idCategoria : number
}

const { Img, Title, Body } = Card

export const CategoryCard : FC<CategoryCardProps> = ({ nombre, precio, imagenes, idCategoria, idProducto }) => {
    return (
        <Link 
            to={Routes.detailProduct.replace(':idCategory', idCategoria.toString()).replace(':idProduct', idProducto.toString())} 
            className="no-link" 
        >
            <Card className="tarjeta-producto">
                <Img 
                    src={ imagenes?.length > 0 ? imagesURL + imagenes[0].imagen : '' } 
                    variant="top" 
                    style={{width: '250px', height: '250px', objectFit: 'cover'}} 
                />
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

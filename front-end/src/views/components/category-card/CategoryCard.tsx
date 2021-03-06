import { FC, useRef, useLayoutEffect } from 'react'
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

const { Title, Body } = Card

export const CategoryCard : FC<CategoryCardProps> = ({ nombre, precio, imagenes, idCategoria, idProducto }) => {

    const imgRef = useRef<HTMLImageElement>(null)

    useLayoutEffect(() => {

        const {current} = imgRef 

        if(current){
            current.height = current.clientWidth
        }

    }, [imgRef])
    
    return (
        <Link 
            to={Routes.detailProduct.replace(':idCategory', idCategoria.toString()).replace(':idProduct', idProducto.toString())} 
            className="no-link" 
        >
            <Card className="tarjeta-producto">
                <Body>
                    <img ref={imgRef} className="tarjeta-producto--foto" src={ imagenes?.length > 0 ? imagesURL + imagenes[0].imagen : '' }  alt="" />
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

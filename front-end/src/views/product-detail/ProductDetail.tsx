import {VFC, useEffect, useState} from 'react'
import { ProductoDto, ProductsByIdCategory } from 'models/Products';
import { ProductImages } from 'shared'
import { useParams } from 'react-router-dom';
import { CategoriesSlider } from 'views/components';
import { InfoProducto } from './components';
import { ProductosEffect } from 'stores/productos/productosEffect';

export const ProductDetail : VFC = () => {

    const [producto, setProducto] = useState<ProductoDto | null>(null)

    const [productos, setProductos] = useState<ProductsByIdCategory | null>(null)

    const {idProduct, idCategory} = useParams<Record<string, any>>()

    useEffect( () => {
        const getData = async (idCategory : number, idProduct : number) => {
            const fetch_producto = await ProductosEffect.requestObtenerProducto(idProduct)
            const fetch_productos = await ProductosEffect.requestObtenerProductos({idCategoria: idCategory})

            setProducto(fetch_producto)
            setProductos(fetch_productos)
        }

        getData(idCategory, idProduct);

    }, [idCategory, idProduct]);

    return (
        <div className="container mt-5">
            <div className="row flex-column flex-md-row">
                <div className="col-12 col-md-6">
                    <ProductImages imagenes={ producto?.imagenes?.map( ({imagen}) => imagen ) || [] } />
                </div>
                <div className="col-12 col-md-6">
                    <InfoProducto producto={producto} />
                </div>
            </div>

            <div className="row mt-5 mb-0 pb-0">
                <h2> También te puede interesar </h2>
                <CategoriesSlider productos={productos?.categorias || []} idCategoria={idCategory} /> 
            </div>

        </div>
    )
}

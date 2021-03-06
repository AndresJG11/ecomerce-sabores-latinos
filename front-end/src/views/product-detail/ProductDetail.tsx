import {VFC, useEffect} from 'react'
import { ProductoDto, ProductsByIdCategory } from 'models/Products';
import { useDispatch, useSelector } from 'react-redux';
import { ProductImages } from 'shared'
import ProductosAction from 'stores/productos/productosAction';
import { useParams } from 'react-router-dom';
import { CategoriesSlider } from 'views/components';
import { InfoProducto } from './components';

export const ProductDetail : VFC = () => {

    const dispatch = useDispatch()

    const producto : ProductoDto | null = useSelector((state: any) => state.ProductosReducer.editarProducto);

    const productos : ProductsByIdCategory = useSelector((state: any) => state.ProductosReducer.productosPorCategoria);

    const {idProduct, idCategory} = useParams<Record<string, any>>()

    useEffect(() => {
        dispatch(ProductosAction.requestObtenerProducto(idProduct))
        dispatch(ProductosAction.requestProductos(idCategory))
    }, [dispatch, idCategory, idProduct]);

    return (
        <div className="container mt-5">
            <div className="row flex-column flex-md-row">
                <div className="col-12 col-md-6">
                    <ProductImages imagenes={ producto?.imagenes?.map( ({imagen}) => imagen ) || [] } />
                </div>
                <div className="col-12 col-md-6">
                    <InfoProducto />
                </div>
            </div>

            <div className="row mt-5 mb-0 pb-0">
                <h2> También te puede interesar </h2>
                <CategoriesSlider productos={productos?.categorias || []} idCategoria={idCategory} /> 
            </div>

        </div>
    )
}

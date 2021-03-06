import './category-detail-styles.css'
import { ProductsByIdCategory } from "models/Products";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductosAction from "stores/productos/productosAction";
import { BannerHomepage } from "views/home-page/components";
import { WrapperCategory } from 'views/components';

export const CategoryDetail = () => {

    const productos: ProductsByIdCategory | null = useSelector((state: any) => state.ProductosReducer.productosPorCategoria);

    const dispatch = useDispatch()

    const { idCategory } = useParams<Record<string, any>>()

    useEffect(() => {
        dispatch(ProductosAction.requestProductos(idCategory))
    }, [dispatch, idCategory]);

    return (
        <div>
            <div className="mt-3">
                <BannerHomepage />
            </div>
            {
                 productos?.categorias &&
                    productos?.categorias.length > 0 &&
                        <WrapperCategory 
                            title={`${productos?.nombreCategoria}`}
                            productos={productos?.categorias || []}
                            idCategoria={ idCategory }
                        />
            }
        </div>
    )
}

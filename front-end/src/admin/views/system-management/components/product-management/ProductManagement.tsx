import { CRUDTable } from 'admin/components/crud-table';
import { FC, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRowsTable } from 'utilities/getRowsTable';
import { FormProductos } from './components';
import ProductosAction from 'stores/productos/productosAction';
import { ProductsByIdCategory } from 'models/Products';
import { Paginator } from 'views';

const listHeader = ['Nombre', 'Descripción', 'Precio']
const rowItems = ['nombre', 'descripcion', 'precio']

export const ProductManagement : FC<{}> = () => {

    const productos : ProductsByIdCategory = useSelector((state: any) => state.ProductosReducer.productosPorCategoria);

    const [idCategoria, setIdCategoria] = useState<number | "">("")

    const dispatch = useDispatch()

    const [actualPage, setActualPage] = useState<number>(1);

    const pageSize = 5

    const pagesToShow = 5

    const onEdit = (event : React.MouseEvent<HTMLButtonElement>) =>{
        const { currentTarget : { id } } = event
        
        const { idProducto } = productos?.categorias[Number(id)] 
        
        idProducto &&
            dispatch(ProductosAction.requestObtenerProducto(idProducto))
    }
        
    const onDelete = (event : React.MouseEvent<HTMLButtonElement>) =>{
        const { currentTarget : { id } } = event
        
        const { idProducto } = productos.categorias[Number(id)] 

        dispatch(ProductosAction.requestEliminarProducto(Number(idProducto), Number(idCategoria)))
    }
    
    return (
        <div>
            <h5> Administrar Productos </h5>
                <div className="row">
                    <FormProductos 
                        idCategoria={idCategoria}
                        setIdCategoria={setIdCategoria}
                        paginatorHandler = { {pageSize, actualPage, setActualPage} }
                    />
                </div> 
                <div className="container mt-4 row">
                    <CRUDTable
                        listHeader={listHeader}
                        listRow={ getRowsTable(productos?.categorias || [], rowItems) }
                        action={true}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                    <Paginator 
                        setActualPage={setActualPage}
                        actualPage={actualPage}
                        totalPages={productos?.paginas || actualPage}
                        pagesToShow={pagesToShow}
                        className="justify-content-center"
                    />
                </div> 
        </div>
    )
}

import { CRUDTable } from 'admin/components/crud-table';
import { FC, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRowsTable } from 'utilities/getRowsTable';
import { FormProductos } from './components';
import { Producto } from 'models/Products/Product';
import ProductosAction from 'stores/productos/productosAction';

const listHeader = ['Nombre', 'Descripción', 'Precio']
const rowItems = ['nombre', 'descripcion', 'precio']

export const ProductManagement : FC<{}> = () => {

    const productos : Array<Producto> = useSelector((state: any) => state.ProductosReducer.productosPorCategoria);

    const [idCategoria, setIdCategoria] = useState<number | "">("")

    const dispatch = useDispatch()

    const onEdit = (event : React.MouseEvent<HTMLButtonElement>) =>{
        const { currentTarget : { id } } = event
        
        const { idProducto } = productos[Number(id)] 
        
        idProducto &&
            dispatch(ProductosAction.requestObtenerProducto(idProducto))
    }
        
    const onDelete = (event : React.MouseEvent<HTMLButtonElement>) =>{
        const { currentTarget : { id } } = event
        
        const { idProducto } = productos[Number(id)] 

        dispatch(ProductosAction.requestEliminarProducto(Number(idProducto), Number(idCategoria)))
    }
    
    return (
        <div>
            <h5> Administrar Productos </h5>
                <div className="row">
                    <FormProductos 
                        idCategoria={idCategoria}
                        setIdCategoria={setIdCategoria}
                    />
                </div> 
                <div className="container mt-4 row">
                    <CRUDTable
                        listHeader={listHeader}
                        listRow={ getRowsTable(productos || [], rowItems) }
                        action={true}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </div> 
        </div>
    )
}

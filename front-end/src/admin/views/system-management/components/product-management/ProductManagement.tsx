import { CRUDTable } from 'admin/components/crud-table';
import { FC, useState} from 'react'
import { useSelector } from 'react-redux'
import { getRowsTable } from 'utilities/getRowsTable';
import { FormProductos } from './components';
import { Producto } from 'models/Products/Product';

const listHeader = ['Nombre', 'Descripción', 'Precio']
const rowItems = ['nombre', 'descripcion', 'precio']

const initProduct : Producto = {
    idProducto: null,
    descripcion: '',
    descuento: null,
    nombre: '',
    precio: null,
    stock: null,
    imagenes: [],
}

export const ProductManagement : FC<{}> = () => {

    const productos : Array<Producto> = useSelector((state: any) => state.ProductosReducer.productosPorCategoria);

    const [editProducto, setEditProducto] = useState<Producto>(initProduct)

    const onEdit = (event : React.MouseEvent<HTMLButtonElement>) =>{
        
        const { currentTarget : { id } } = event
        
        setEditProducto( productos[Number(id)] )
        
    }

    const onDelete = () =>{

    }
    
    return (
        <div>
            <h5> Administrar Productos </h5>
                <div className="row">
                    <FormProductos 
                        editProducto={editProducto}
                        setEditProducto={setEditProducto}
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

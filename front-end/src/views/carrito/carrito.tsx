import { CRUDTable } from 'admin/components/crud-table'
import { productoCarrito } from 'models';
import { useState, VFC } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ModalComprar } from 'shared/modal-comprar/ModalComprar';
import { getRowsTable } from 'utilities/getRowsTable';
import { handlerCarrito } from 'utilities/handlerCarrito';

const listHeader = [ 'ID Producto', 'Nombre', 'Cantidad', 'Valor' ]
const rowItems = ['idProducto', 'nombre', 'cantidad', 'total']

export const Carrito : VFC = () => {

    const [show, setShow] = useState<boolean>(false);

    const productosCarrito : Array<productoCarrito> = useSelector((state: any) => state.CarritoReducer.productosCarrito);

    const dispatch = useDispatch()

    const onEdit : React.MouseEventHandler<HTMLButtonElement> = (event) => {
        
    }

    const onDelete : React.MouseEventHandler<HTMLButtonElement> = (event) => {
        
        const { currentTarget : { id } } = event

        const productoAEliminar = productosCarrito![Number(id)]

        handlerCarrito.eliminarProducto( productoAEliminar.idProducto, dispatch )

    }

    const handleComprar = () => {
        setShow(true)
    }

    return (
        <div className="container">
            <ModalComprar show={show} setShow={setShow}  />
            <div className="header-contacto">
                <div className="header-texto">
                    <h1> Carrito de compras </h1>
                    <h4> Manejamos productos 100% tradicionales, no te arrepentiras de tu compra </h4>
                </div>
            </div>
            <button className="btn btn-primary text-white d-block mx-auto w-50 m-4" onClick={ () => handleComprar() } > Realizar Compra </button>
            <CRUDTable
                listHeader={listHeader}
                listRow={ getRowsTable( productosCarrito || [], rowItems ) }
                action={true}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        </div>
    )
}

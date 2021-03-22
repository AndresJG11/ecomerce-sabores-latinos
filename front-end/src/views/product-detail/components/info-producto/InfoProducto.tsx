import { productoCarrito } from 'models';
import { ProductoDto } from 'models/Products';
import { useState, FC } from 'react'
import { useDispatch } from 'react-redux';
import { NumericInput } from 'shared';
import { handlerCarrito } from 'utilities/handlerCarrito';

export const InfoProducto : FC<{producto: ProductoDto | null}> = ({producto}) => {

    const [cantidad, setCantidad] = useState<number>(1);

    const dispatch = useDispatch()

    const handleAgregarCarrito = (e : React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault()

        if(cantidad === 0) return(null)
        
        const nuevoProducto : productoCarrito = { nombre: producto!.nombre, idProducto: producto!.idProducto, cantidad, total: cantidad*(producto?.precio || 0)  }

        handlerCarrito.agregarProducto(nuevoProducto, dispatch)

    }

    return (
        <div className="d-flex justify-content-around h-100 flex-column">
            <div>
                <h1> {producto?.nombre} </h1>
                <div className="tarjeta-producto--precio">
                    <span>{producto?.precio}$ CL</span>
                </div>
                <p className="mt-3"> {producto?.descripcion} </p>
            </div>
            <div className="d-flex flex-column flex-xl-row justify-content-around align-items-center align-items-xl-start">
                <div>
                    <NumericInput value={cantidad} setValue={setCantidad} />
                    <p className="d-block text-center p-1">{cantidad*(producto?.precio || 0)}$</p>
                </div>

                <button type="button" className="btn btn-primary w-50" onClick={handleAgregarCarrito}> 
                    <span className="text-white d-block">Agregar Al Carrito</span>
                </button>
            </div>
        </div>
    )
}

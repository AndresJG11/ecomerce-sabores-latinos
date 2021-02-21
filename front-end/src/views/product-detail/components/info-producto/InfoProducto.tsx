import { ProductoDto } from 'models/Products';
import React from 'react'
import { useSelector } from 'react-redux';

export const InfoProducto = () => {

    const producto: ProductoDto | null = useSelector((state: any) => state.ProductosReducer.editarProducto);

    return (
        <div className="d-flex justify-content-around h-100 flex-column">
            <div>
                <h1> {producto?.nombre} </h1>
                <div className="tarjeta-producto--precio">
                    <span>{producto?.precio}$ CL</span>
                </div>
                <p className="mt-3"> {producto?.descripcion} </p>
            </div>

            <button type="button" className="btn btn-primary text-white w-75 align-self-center"> Agregar Al Carrito </button>
        </div>
    )
}

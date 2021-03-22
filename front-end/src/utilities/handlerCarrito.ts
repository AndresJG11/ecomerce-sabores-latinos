import { productoCarrito } from "models"
import AlertaAction from "stores/alerta/alertaAction"
import {Dispatch} from 'redux'
import CarritoAction from "stores/carrito/carritoAction"

const agregarProducto = (nuevoProducto: productoCarrito, dispatch : Dispatch) => {

    let productosCarrito = localStorage.getItem('productosCarrito') ? JSON.parse( localStorage.getItem('productosCarrito')! ) : []

    let productoExistente = productosCarrito?.find((productoCarrito: productoCarrito) => productoCarrito.idProducto === nuevoProducto.idProducto)

    if (productoExistente) {

        productosCarrito = productosCarrito.map((productoCarrito: productoCarrito) => {
            if (productoCarrito.idProducto === productoExistente.idProducto) {
                return ({ ...productoCarrito, cantidad: productoCarrito.cantidad + nuevoProducto.cantidad, total: nuevoProducto.total })
            } else {
                return (productoCarrito)
            }
        })

    } else {

        productosCarrito = [...productosCarrito, nuevoProducto]

    }
    
    localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito))
    dispatch( CarritoAction.actualizarProductos( productosCarrito ) )
    dispatch( AlertaAction.setAlerta( {show: true, message: 'Producto agregado con éxito', variant: 'success' } ) )
}

const obtenerProductos = () : Array<productoCarrito> | null => {
    return localStorage.getItem('productosCarrito') ? JSON.parse( localStorage.getItem('productosCarrito')! ) : null
}

const eliminarProducto = (idProducto : number, dispatch : Dispatch) => {
    
    const productosActuales  = obtenerProductos()

    const productosFiltrados = productosActuales?.filter( producto => producto.idProducto !== idProducto  )

    localStorage.setItem('productosCarrito', JSON.stringify(productosFiltrados))
    dispatch( CarritoAction.actualizarProductos( productosFiltrados || [] ) )
    dispatch( AlertaAction.setAlerta( {show: true, message: 'Producto eliminado con éxito', variant: 'success' } ) )
}

export const handlerCarrito = {
    agregarProducto,
    obtenerProductos,
    eliminarProducto
}
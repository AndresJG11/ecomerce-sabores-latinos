export interface ProductoDto{
    readonly descripcion :	string
    readonly descuento :	number
    readonly idProducto :	number
    readonly imagenes :	Array<{ idImagen: number, imagen : string}>
    readonly nombre :	string
    readonly precio :	number
    readonly stock :	number
}
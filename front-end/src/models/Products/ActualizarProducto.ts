export interface ActualizarProducto {
    
    readonly categoria: { id : number }

    readonly descripcion : string

    readonly descuento : number

    readonly id : number

    readonly nombre : string

    readonly pais : { id : number, nombre : string }

    readonly precio : number

    readonly stock : number

}
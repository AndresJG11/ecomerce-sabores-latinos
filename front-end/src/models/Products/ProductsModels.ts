export interface PrecioProducto {
    readonly descuento : boolean,

    readonly porcentajeDescuento : number,

    readonly precioActual : number,

    readonly precioPasado : number,
}

export interface productItem {
        
    readonly idProducto : number,

    readonly imagenes : Array<string>,
    
    readonly precio : PrecioProducto,
    
    readonly nombre : number,
    
    readonly stock : number,

    readonly descripcion : string, 

    readonly vendidos : number,

    readonly pais : string | null,

}
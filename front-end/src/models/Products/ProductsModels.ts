export interface Producto {
        
    readonly idProducto : number,

    readonly descripcion : string,
    
    readonly descuento : number,

    readonly nombre : string,

    readonly precio : number,

    readonly stock : number,

    readonly imagenes : Array<string>,
    
}
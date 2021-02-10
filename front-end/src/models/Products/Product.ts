export interface Producto {
        
    readonly idProducto : number | null,

    readonly descripcion : string,
    
    readonly descuento : number | null,

    readonly nombre : string,

    readonly precio : number | null,

    readonly stock : number | null,

    readonly imagenes : Array<{ idImagen: number, imagen : string}>
    
}
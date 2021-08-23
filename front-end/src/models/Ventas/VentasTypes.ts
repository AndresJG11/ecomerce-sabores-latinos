export interface Cliente {

    readonly direccion: String
    
    readonly documento: String
    
    readonly id: number | null
    
    readonly nombre: String
    
    readonly telefono: String
}

export interface ItemDetalleVenta {

    readonly cantidad : number

    readonly idProducto : number

}

export interface DetallesVenta {

    readonly cliente : Cliente,

    readonly detallesVenta : Array<ItemDetalleVenta>

} 

export interface ItemVenta {
    readonly idVenta : number,
    readonly estado : number,
    readonly fecha : string,
    readonly telefono : string,
    readonly nombreCliente : string,
    readonly precioTotal : number
}

export interface VentasPaginadas {
    readonly ventas : ItemVenta[],
    readonly paginas : number
}
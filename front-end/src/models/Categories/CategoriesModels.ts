import { Producto } from "models/Products/Product";

export interface Categoria {
    
    readonly idCategoria : number,

    readonly nombre : string,

    readonly icono : string,

    readonly productos : Array<Producto>
}

export interface CategoriaListItem {

    readonly idCategoria : number,

    readonly nombre : string,

    readonly icono : string,

    readonly productos : null

}

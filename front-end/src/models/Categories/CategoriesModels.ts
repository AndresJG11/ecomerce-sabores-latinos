import { Producto } from "models/Products/Product";

export interface Categoria {
    
    readonly idCategoria : number,

    readonly nombre : string,

    readonly icono : string,

    readonly productos : Array<Producto>
}

export interface CategoriaListItem {

    readonly paginas : number,

    readonly categorias : Array<Categoria>

}

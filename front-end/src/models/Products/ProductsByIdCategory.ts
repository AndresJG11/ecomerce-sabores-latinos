import { Producto } from "./Product";

export interface ProductsByIdCategory{
    
    readonly categorias : Array<Producto>

    readonly paginas : number

    readonly nombreCategoria : string

}
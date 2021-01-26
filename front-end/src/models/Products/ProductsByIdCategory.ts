import { Producto } from "./Product";

export interface ProductsByIdCategory{
    
    readonly idCategoria : number,

    readonly productos : Array<Producto>

}
export interface CategoriesListItem {
    
    readonly idCategoria : number,

    readonly nombre : string,

    readonly icono : string
}

export interface CategoriesList {

    readonly categories : Array<CategoriesListItem>,

    readonly codigoError : number,

    readonly mensajeError : string | null,

}

export interface Category {

    readonly idCategoria : number,

    readonly nombre : string,

    readonly codigoError : number,

    readonly mensajeError : string | null,

}
export interface FormProductosProps {
    readonly idCategoria : number | "", 
    readonly setIdCategoria : Function, 
    readonly paginatorHandler : { pageSize : number, actualPage : number, setActualPage : Function }
}
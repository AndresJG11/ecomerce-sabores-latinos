import { CategoriesList, Category } from "models"

export const getCategories = () => ({
    codigoError: 0,
    mensajeError: null,
    categories: [
        {idCategoria: 0, nombre: 'Congelados', icono: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1200px-How_to_use_icon.svg.png'},
        {idCategoria: 1, nombre: 'Bebidas', icono: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1200px-How_to_use_icon.svg.png'},
        {idCategoria: 2, nombre: 'Snacks', icono: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1200px-How_to_use_icon.svg.png'},
        {idCategoria: 3, nombre: 'Dulces', icono: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1200px-How_to_use_icon.svg.png'},
    ]
}) as CategoriesList

export const getCategoriesByID = (idCategoria: number) => ({
    codigoError: 0,
    mensajeError: null,
    idCategoria,
    nombre : `Categoria ${idCategoria}`
}) as Category


export const CategoriesServices = {
    getCategories,
    getCategoriesByID
}
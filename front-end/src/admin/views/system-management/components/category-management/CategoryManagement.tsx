import {useEffect, FC, useState} from 'react'
import CategoriasAction from "stores/categorias/categoriasAction"
import { useDispatch } from 'react-redux'
import { CategoriaListItem, Categoria } from "models";
import { useSelector } from "react-redux";
import { CRUDTable } from 'admin/components/crud-table';
import { getRowsTable } from 'utilities/getRowsTable';
import { FormCategory } from './components';
import { Paginator } from 'views';

const listHeader = [ 'ID', 'Nombre' ]
const rowItems = [ 'idCategoria', 'nombre' ]

export const CategoryManagement : FC<{}> = () => {

    const dispatch = useDispatch()

    const paginacionCategorias : CategoriaListItem = useSelector((state: any) => state.CategoriasReducer.paginacionCategorias);

    const [categoria, setCategoria] = useState<Categoria | null>(null)

    const [actualPage, setActualPage] = useState<number>(1);

    const pageSize = 6

    const pagesToShow = 5

    useEffect(() => {
        dispatch(CategoriasAction.requestObtenerCategoriasPaginadas({actualPage, pageSize}))
    }, [dispatch, actualPage]);
    
    
    const onEdit = (event : React.MouseEvent<HTMLButtonElement>) =>{
        
        const { currentTarget : { id } } = event
        
        setCategoria( paginacionCategorias.categorias[Number(id)] )
        
    }
    
    const onDelete = (event : React.MouseEvent<HTMLButtonElement>) => {

        const { currentTarget : { id } } = event
        
        dispatch(CategoriasAction.requestDeleteCategoria(paginacionCategorias.categorias[Number(id)].idCategoria, {actualPage, pageSize}) )        
    }

    return (
        <>
            <h5> Administrar Categorías </h5>
            <div className="row w-100">
                <div className="col-6">
                    <FormCategory 
                        Categoria = {categoria}
                        cancelSelect={ () => setCategoria(null) }
                        actualPage={actualPage}
                        pageSize={pageSize}
                    />
                </div>
                <div className="col-6">
                    <CRUDTable 
                        listHeader={listHeader}
                        listRow={ getRowsTable(paginacionCategorias?.categorias || {}, rowItems) }
                        action={true}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                    <Paginator 
                        setActualPage={setActualPage}
                        actualPage={actualPage}
                        totalPages={paginacionCategorias?.paginas || actualPage}
                        pagesToShow={pagesToShow}
                        className="justify-content-center"
                    />
                </div>
            </div>        
        </>
    )
}

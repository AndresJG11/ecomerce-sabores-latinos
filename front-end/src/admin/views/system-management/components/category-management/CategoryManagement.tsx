import {useEffect, FC, useState} from 'react'
import CategoriasAction from "stores/categorias/categoriasAction"
import { useDispatch } from 'react-redux'
import { Categoria as CategoriaType } from "models";
import { useSelector } from "react-redux";
import { CRUDTable } from 'admin/components/crud-table';
import { getRowsTable } from 'utilities/getRowsTable';
import { FormCategory } from './components';

export const CategoryManagement : FC<{}> = () => {

    const dispatch = useDispatch()

    //TODO: Cambiar para paginación
    const categorias : Array<CategoriaType> = useSelector((state: any) => state.CategoriasReducer.categoriasHome);

    const [categoria, setCategoria] = useState<CategoriaType | null>(null)

    const listHeader = [ 'ID', 'Nombre' ]
    const rowItems = [ 'idCategoria', 'nombre' ]

    useEffect(() => {
        dispatch(CategoriasAction.requestCategoriasHome())
    }, [dispatch]);
    
    
    const onEdit = (event : React.MouseEvent<HTMLButtonElement>) =>{
        
        const { currentTarget : { id } } = event
        
        setCategoria( categorias[Number(id)] )
        
    }
    
    const onDelete = (event : React.MouseEvent<HTMLButtonElement>) => {

        const { currentTarget : { id } } = event
        
        dispatch(CategoriasAction.requestDeleteCategoria(categorias[Number(id)].idCategoria))        
    }

    return (
        <div className="p-3">
            <h5> Administrar Categorías </h5>
            <div className="row w-100">
                <div className="col-6">
                    <FormCategory 
                        Categoria = {categoria}
                        cancelSelect={ () => setCategoria(null) }
                    />
                </div>
                <div className="col-6">
                    <CRUDTable 
                        listHeader={listHeader}
                        listRow={ getRowsTable(categorias, rowItems) }
                        action={true}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </div>
            </div>        
        </div>
    )
}

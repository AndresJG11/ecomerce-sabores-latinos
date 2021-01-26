import { FC } from 'react'
import { Table } from 'react-bootstrap'
import DeleteIcon from 'assets/icons/eliminar.svg'
import EditIcon from 'assets/icons/editar.svg'

interface CRUDTableProps {

    readonly listHeader : Array<string>,

    readonly listRow : Array<Array<string>> | null

    readonly action ? : boolean
    
    readonly onEdit ? : React.MouseEventHandler<HTMLButtonElement>

    readonly onDelete ?  : React.MouseEventHandler<HTMLButtonElement>

}

export const CRUDTable: FC<CRUDTableProps> = ({ listHeader, listRow, action, onEdit, onDelete }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {
                        listHeader && listHeader.map((text: string, idx: number) => <th key={idx}>{text}</th>)
                    }
                    {
                        action && <th>Acción</th>
                    }
                </tr>
            </thead>
            <tbody>
                {
                    listRow ?

                        listRow.length > 0 ?
                            listRow.map((row: Array<string>, keyRow: number) =>
                                <tr key={keyRow}>
                                    {
                                        row.map((text: string, keyText: number) => <td key={keyText}>{text}</td>)
                                    }
                                    {
                                        action && 
                                            <td className="d-flex justify-content-center">
                                                <button id={keyRow+''} onClick={onEdit} className="btn p-0"><img src={EditIcon} alt="" style={{width: '1rem', marginRight: 5}}/></button>
                                                <button id={keyRow+''} onClick={onDelete} className="btn p-0 ml-3"><img src={DeleteIcon} alt="" style={{width: '1rem'}}/></button>
                                            </td>
                                    }
                                </tr>
                            )
                        : <tr><td colSpan={action ? listHeader.length + 1 : listHeader.length} className="text-center p-3">No existen registros</td></tr>

                    : <tr><td colSpan={action ? listHeader.length + 1 : listHeader.length } className="text-center p-3">Cargando datos...</td></tr>
                }
            </tbody>
        </Table>
    )
}

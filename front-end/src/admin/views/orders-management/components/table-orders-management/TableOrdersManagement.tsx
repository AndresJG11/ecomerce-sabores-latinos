import { ItemVenta } from "models"
import { Form, Table } from "react-bootstrap"

interface TableOrdersProps {

    readonly listHeader : Array<string>

    readonly listRow : ItemVenta[] | null

    readonly action ? : boolean
    
    readonly onCheck : Function

}

export const TableOrdersManagement = ({listHeader, listRow, onCheck}:TableOrdersProps) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    { listHeader && listHeader.map((text: string, idx: number) => <th key={idx}>{text}</th> ) }
                </tr>
            </thead>

            <tbody>
                {
                    listRow === null ?
                        <tr><td colSpan={listHeader.length} className="text-center"> Cargando... </td></tr>
                        : listRow.length === 0 ? <tr><td className="text-center" colSpan={listHeader.length}> No hay ventas pendientes </td></tr>
                        : listRow.map( (venta, idx) => 
                            <tr key={idx}>
                                <td>
                                    <Form.Group className="d-flex justify-content-center" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" onChange={(e) => onCheck(e, venta)} />
                                    </Form.Group>
                                </td>
                                <td>{venta.idVenta}</td>
                                <td>{venta.fecha}</td>
                                <td>{venta.nombreCliente}</td>
                                <td>{venta.telefono}</td>
                                <td>{venta.precioTotal}</td>
                                <td>{venta.estado === 0 ? 'Pendiente' : 'Vendido'}</td>
                            </tr>
                        )
                }
            </tbody>

        </Table>
    )
}

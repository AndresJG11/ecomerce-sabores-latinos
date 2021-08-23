import {VFC, useEffect, useState} from 'react'
import { TableOrdersManagement } from '../components/table-orders-management/TableOrdersManagement'
import { useSelector, useDispatch } from "react-redux";
import VentaAction from "stores/venta/ventaAction"
import { ItemVenta, VentasPaginadas } from 'models';
import { Paginator } from 'views';

export const OrdersManagement : VFC = () => {
    const dispatch = useDispatch()

    const ventasPaginadas : VentasPaginadas | null = useSelector((state: any) => state.VentaReducer.ventasPaginadas);

    const listHeader : string[] = ['', 'ID Venta', 'Fecha', 'Nombre', 'Teléfono', 'Total', 'Estado']

    const [actualPage, setActualPage] = useState<number>(1);
    const [selectedItems, setSelectedItems] = useState<ItemVenta[]>([]);
    
    const pageSize = 6
    const pagesToShow = 6

    const estado = 0 // Para ventas sin concretar (pedidos)

    useEffect(() => {
        dispatch(VentaAction.requestVentas({actualPage, pageSize, estado}))
    }, [dispatch, actualPage]);

    const onCheck = (e: React.FormEvent, ventaSelect: ItemVenta) => {
        let ventasFilters = selectedItems.filter( venta => venta.idVenta !== ventaSelect.idVenta )
        
        ventasFilters = ventasFilters.length === selectedItems.length ? selectedItems.concat(ventaSelect) : ventasFilters
        
        setSelectedItems(ventasFilters)
    }
    
    const handlerCerrarVenta = () => {
        // ToDo: Mandar arreglo de idVentas
        const idVentas = selectedItems.map( venta => venta.idVenta )
        dispatch(VentaAction.requestCerrarVenta( {idVenta: idVentas[0], actualPage, pageSize, estado} ))
    }

    return (
        <div className="container">
            <h5 className="my-3"> Gestión de pedidos </h5>

            <TableOrdersManagement onCheck={onCheck} listRow={ventasPaginadas?.ventas || null} listHeader={listHeader} />
            {
                ventasPaginadas?.paginas ?
                    <Paginator {...{setActualPage, actualPage, pagesToShow, totalPages: ventasPaginadas?.paginas || 0}}  />
                    : <></>
            }

            {   <div className="d-flex justify-content-end">
                    <div className="d-flex flex-column align-items-center">
                        <span>{selectedItems.length} Seleccionados</span>
                        <div className="d-flex justify-content-between">
                            <button disabled={selectedItems.length === 0} className="btn btn-danger text-white mx-1"> Eliminar Ventas </button>
                            <button onClick={handlerCerrarVenta} disabled={selectedItems.length === 0} className="btn btn-success text-white mx-1"> Marcar como vendido </button>
                        </div>
                    </div>
               </div>
            }
        </div>
    )
}

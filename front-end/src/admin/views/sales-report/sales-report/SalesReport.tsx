import {VFC, useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import VentaAction from "stores/venta/ventaAction"
import { ItemVenta, VentasPaginadas } from 'models';
import { Paginator } from 'views';
import { TableOrdersManagement } from 'admin/views/orders-management/components/table-orders-management/TableOrdersManagement';

export const SalesReport : VFC = () => {
    const dispatch = useDispatch()

    const ventasPaginadas : VentasPaginadas | null = useSelector((state: any) => state.VentaReducer.ventasPaginadas);

    const listHeader : string[] = ['', 'ID Venta', 'Fecha', 'Nombre', 'Teléfono', 'Total', 'Estado']

    const [actualPage, setActualPage] = useState<number>(1);
    const [selectedItems, setSelectedItems] = useState<ItemVenta[]>([]);
    
    const pageSize = 6
    const pagesToShow = 6

    const estado = 1 // Para ventas concretadas

    useEffect(() => {
        dispatch(VentaAction.requestVentas({actualPage, pageSize, estado}))
    }, [dispatch, actualPage]);

    const onCheck = (e: React.FormEvent, ventaSelect: ItemVenta) => {
        let ventasFilters = selectedItems.filter( venta => venta.idVenta !== ventaSelect.idVenta )
        
        ventasFilters = ventasFilters.length === selectedItems.length ? selectedItems.concat(ventaSelect) : ventasFilters
        
        setSelectedItems(ventasFilters)
    }

    return (
        <div className="container">
            <h5 className="my-3"> Reporte de ventas </h5>

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
                        </div>
                    </div>
               </div>
            }
        </div>
    )
}

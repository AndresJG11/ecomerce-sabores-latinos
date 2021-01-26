import { useEffect, useState , FC } from 'react'
import { Form, FormLabel, FormControl, FormGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CategoriasAction from "stores/categorias/categoriasAction"
import { CategoriaListItem as CategoriaListType } from "models";
import ProductosAction from 'stores/productos/productosAction';
import { Producto } from 'models/Products/Product';
import { ActualizarProducto } from 'models/Products/ActualizarProducto';

const initProduct : Producto = {
    idProducto: null,
    descripcion: '',
    descuento: null,
    nombre: '',
    precio: null,
    stock: null,
    imagenes: [],
}

export const FormProductos : FC<{editProducto : Producto, setEditProducto : Function}> = ({editProducto, setEditProducto}) => {

    const dispatch = useDispatch()

    const categorias: Array<CategoriaListType> = useSelector((state: any) => state.CategoriasReducer.categoriasHome);

    const [idCategoria, setIdCategoria] = useState<number | "">("")

    useEffect(() => {
        dispatch(CategoriasAction.requestCategoriasLista())
    }, [dispatch]);

    useEffect(() => {
        dispatch(ProductosAction.requestProductos(Number(idCategoria)))
    }, [idCategoria]);

    const handleGuardar = () =>{
        // Editar Producto
        if(!editProducto.idProducto){
            console.log('crear producto')   
        }else{

            const actualizarProducto : ActualizarProducto = {
                categoria: { id : idCategoria || 0 },
                descripcion : editProducto.descripcion,
                descuento : editProducto?.descuento || 0,
                id : editProducto.idProducto,
                nombre : editProducto.nombre,
                pais : { id : 1, nombre : 'string' },
                precio : editProducto?.precio || 0,
                stock : editProducto?.stock || 0
            }

            dispatch( ProductosAction.requestActualizarProducto(actualizarProducto, idCategoria || 0) )
        }
    }

    return (
        <Form>
            <div className="row">

                <div className="col-4 align-items-center d-flex justify-content-center">
                    <FormGroup className="w-75">
                        <FormLabel>Categoría</FormLabel>
                        <FormControl
                            as="select"
                            value={idCategoria}
                            onChange={({ target: { value } }) => setIdCategoria(Number(value))}
                        >
                            <option value="" disabled>Seleccione</option>
                            {
                                categorias && categorias.map(({ idCategoria, nombre }) =>
                                    <option key={idCategoria} value={idCategoria}>{nombre}</option>
                                )
                            }
                        </FormControl>
                    </FormGroup>

                </div>

                <div className="col-4">
                    <div className="row">
                        <FormGroup className="w-50">
                            <FormLabel>Nombre</FormLabel>
                            <FormControl
                                type="text"
                                value={editProducto.nombre || ''}
                                onChange={({target: {value}})=> setEditProducto({...editProducto, nombre: value})}
                            />
                        </FormGroup>

                        <FormGroup className="w-50">
                            <FormLabel>Precio</FormLabel>
                            <FormControl
                                type="number"
                                value={editProducto.precio || ''}
                                onChange={({target: {value}})=> setEditProducto({...editProducto, precio: Number(value)})}
                            />
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <FormLabel>Descripción Corta</FormLabel>
                        <FormControl
                            as="textarea"
                            rows={3}
                            value={editProducto.descripcion || ''}
                            onChange={({target: {value}})=> setEditProducto({...editProducto, descripcion: value})}
                        />
                    </FormGroup>
                </div>

                <div className="col-4 d-flex flex-column justify-content-around align-items-center">
                    <button type="button" className="btn btn-admin--yellow w-75" onClick={handleGuardar}> Guardar </button>
                    <button type="button" className="btn btn-secondary text-white w-75" onClick={()=>setEditProducto(initProduct)}> Cancelar </button>
                </div>

            </div>


        </Form>
    )
}

import { useEffect, useState, FC } from 'react'
import { Form, FormLabel, FormControl, FormGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CategoriasAction from "stores/categorias/categoriasAction"
import { CategoriaListItem as CategoriaListType } from "models";
import ProductosAction from 'stores/productos/productosAction';
import { ProductoDto, ActualizarProducto } from 'models/Products';
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import { CRUDImagenes } from '../crud-imagenes';

//ToDo: Implementar paginación en productos
//ToDo: Administrar imagenes  

const ValidationSchema: Record<string, RegisterOptions> = {
    nombre: { required: 'Debes ingresar un nombre al producto' },
    precio: { required: 'Debes ingresar un precio al producto' },
    descripcion: { required: 'Debes ingresar una descripción breve del producto' },
}

export const FormProductos: FC<{idCategoria : number | "", setIdCategoria : Function}> = ({idCategoria, setIdCategoria }) => {

    const dispatch = useDispatch()

    const listaCategorias: CategoriaListType | null = useSelector((state: any) => state.CategoriasReducer.listaCategorias);

    const editProducto : ProductoDto | null = useSelector((state: any) => state.ProductosReducer.editarProducto);

    const { register, handleSubmit, errors, setValue, reset } = useForm({ mode: 'onBlur' });

    // eslint-disable-next-line
    const [actualPage, setActualPage] = useState<number>(1);

    // eslint-disable-next-line
    const pageSize = 5

    const handleCancelar = () => {
        dispatch(ProductosAction.setEditarProducto(null))
        reset()
    }

    const handleGuardar : SubmitHandler<Record<string, any>> = (data) => {
        // Crear Producto
        if (!editProducto?.idProducto) {

            const agregarProducto: ActualizarProducto = {
                categoria: { id: idCategoria || 0 },
                descripcion: editProducto?.descripcion || '',
                descuento: editProducto?.descuento || 0,
                id: 0,
                nombre: editProducto?.nombre || '',
                pais: { id: 1, nombre: 'string' },
                precio: editProducto?.precio || 0,
                stock: editProducto?.stock || 0
            }

            dispatch(ProductosAction.requestAgregarProducto(agregarProducto, idCategoria || 0))

        } else {
            // Editar Producto
            const actualizarProducto: ActualizarProducto = {
                categoria: { id: idCategoria || 0 },
                descripcion: data.descripcion,
                descuento: editProducto?.descuento || 0,
                id: editProducto.idProducto,
                nombre: data.nombre,
                pais: { id: 1, nombre: 'string' },
                precio: data.precio || 0,
                stock: editProducto?.stock || 0
            }

            dispatch(ProductosAction.requestActualizarProducto(actualizarProducto, idCategoria || 0))
        }
    }

    const agregarImagen = (e : React.ChangeEvent<HTMLInputElement>) => {

        if(!e.target.files) return
        
        const file = e.target.files[0]

        const formData = new FormData();

        formData.append('file', file )

        if(editProducto?.idProducto){
            dispatch(ProductosAction.requestAgregarImagenProducto( formData, editProducto.idProducto ) )
        }
        
    }
    
    const eliminarImagen = ( idImagen : number ) => {
        editProducto?.idProducto &&
            dispatch(ProductosAction.requestEliminarImagenProducto( idImagen, editProducto.idProducto ) )
    }

    useEffect(() => {
        dispatch(CategoriasAction.requestObtenerCategoriasLista())
    }, [dispatch, actualPage]);

    useEffect(() => {
        dispatch(ProductosAction.requestProductos(Number(idCategoria)))
        dispatch(ProductosAction.setEditarProducto(null))
    }, [idCategoria, dispatch]);

    useEffect(() => {
        if(editProducto){
            setValue('nombre', editProducto.nombre)
            setValue('precio', editProducto.precio)
            setValue('descripcion', editProducto.descripcion)
        }
    }, [editProducto, setValue]);

    return (
        <Form onSubmit={handleSubmit(handleGuardar)}>
            <div className="row">

                <div className="col-6">
                    <h6>Información del producto</h6>
                    <FormGroup>
                        <FormLabel>Categoría</FormLabel>
                        <FormControl
                            as="select"
                            value={idCategoria}
                            onChange={({ target: { value } }) => setIdCategoria(Number(value))}
                        >
                            <option value="" disabled>Seleccione</option>
                            {
                                listaCategorias?.categorias && listaCategorias.categorias.map(({ idCategoria, nombre }) =>
                                    <option key={idCategoria} value={idCategoria}>{nombre}</option>
                                )
                            }
                        </FormControl>
                    </FormGroup>

                    <div className="row">
                        <FormGroup className="w-50">
                            <FormLabel>Nombre</FormLabel>
                            <FormControl
                                type="text"
                                ref={register(ValidationSchema.nombre)}
                                name="nombre"
                                isInvalid={Boolean(errors.nombre)}
                            />
                        {errors.nombre && <FormControl.Feedback type="invalid">{errors.nombre.message}</FormControl.Feedback>}
                        </FormGroup>

                        <FormGroup className="w-50">
                            <FormLabel>Precio</FormLabel>
                            <FormControl
                                type="number"
                                ref={register(ValidationSchema.precio)}
                                name="precio"
                                isInvalid={Boolean(errors.precio)}
                                />
                        {errors.precio && <FormControl.Feedback type="invalid">{errors.precio.message}</FormControl.Feedback>}
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <FormLabel>Descripción Corta</FormLabel>
                        <FormControl
                            as="textarea"
                            rows={3}
                            ref={register(ValidationSchema.descripcion)}
                            name="descripcion"
                            isInvalid={Boolean(errors.descripcion)}
                        />
                        {errors.descripcion && <FormControl.Feedback type="invalid">{errors.descripcion.message}</FormControl.Feedback>}
                    </FormGroup>
                </div>

                <div className="col-6">
                    <h6>Imágenes</h6>
                    <CRUDImagenes
                        imagenes={editProducto?.imagenes || null}
                        agregarImagen={agregarImagen}
                        eliminarImagen={eliminarImagen}
                    />
                </div>

                <div className="col-12 d-flex justify-content-around align-items-center mt-3">
                    <button type="button" className="btn btn-secondary text-white w-25" onClick={handleCancelar} > Cancelar </button>
                    <button type="submit" className="btn btn-admin--yellow w-25"> Guardar </button>
                </div>

            </div>


        </Form>
    )
}

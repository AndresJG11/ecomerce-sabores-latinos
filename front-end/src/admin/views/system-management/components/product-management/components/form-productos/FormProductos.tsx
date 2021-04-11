import { useEffect, useState, FC } from 'react'
import { Form, FormLabel, FormControl, FormGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CategoriasAction from "stores/categorias/categoriasAction"
import { CategoriaListItem as CategoriaListType } from "models";
import ProductosAction from 'stores/productos/productosAction';
import { ProductoDto, ActualizarProducto } from 'models/Products';
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import { CRUDImagenes } from '../crud-imagenes';
import { FormProductosProps } from './FormProductosProps';
import AlertaAction from 'stores/alerta/alertaAction';
import { CrearProducto } from 'models/Products/CrearProducto';

//ToDo: Administrar imagenes  

const ValidationSchema: Record<string, RegisterOptions> = {
    nombre: { required: 'Debes ingresar un nombre al producto' },
    precio: { required: 'Debes ingresar un precio al producto' },
    descripcion: { required: 'Debes ingresar una descripción breve del producto' },
}

export const FormProductos: FC<FormProductosProps> = ({idCategoria, setIdCategoria, paginatorHandler }) => {

    const dispatch = useDispatch()

    const listaCategorias: CategoriaListType | null = useSelector((state: any) => state.CategoriasReducer.listaCategorias);

    const editProducto : ProductoDto | null = useSelector((state: any) => state.ProductosReducer.editarProducto);

    const { register, handleSubmit, errors, setValue, reset } = useForm({ mode: 'onBlur' });

    const [imagenesCrear, setImagenesCrear] = useState<Array<{ idImagen ? : number, imagen: string }> | null>(null);

    const handleCancelar = () => {
        dispatch(ProductosAction.setEditarProducto(null))
        dispatch(ProductosAction.setProductosPorCategoria(null))
        setIdCategoria("")
        setImagenesCrear(null)
        reset()
    }

    const handleGuardar : SubmitHandler<Record<string, any>> = (data) => {
        // Crear Producto
        if (!editProducto?.idProducto) {

            const agregarProducto: CrearProducto = {
                categoria: { id: idCategoria || 0 },
                descripcion: data?.descripcion || '',
                descuento: data?.descuento || 0,
                nombre: data?.nombre || '',
                pais: { id: 1, nombre: 'string' },
                precio: data?.precio || 0,
                stock: data?.stock || 0,
                imagenes: imagenesCrear!.map( ({imagen} : any)=> ({imagen})  )
            }
                
            dispatch(ProductosAction.requestAgregarProducto(agregarProducto, idCategoria || 0))
            handleCancelar()
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

    const agregarImagen = async (event : React.ChangeEvent<HTMLInputElement>) => {

        const readFile = (fileSource : File) => {
            return new Promise((resolve, reject) => {

              const fileReader = new FileReader();

              fileReader.onerror = () => reject(fileReader.error);

              fileReader.onload = () => resolve({imagen: fileReader.result});

              fileReader.readAsDataURL(fileSource);
            });
          }

        const { target: { files } } = event

        if (!files) return

        const filesBase64 = await Promise.all( Array.from(files).map(file => readFile(file)) );

        
        if(editProducto?.idProducto){
            const imagenes = Array.from(filesBase64).map( ({imagen} : any)=> (imagen)  )
            dispatch(ProductosAction.requestAgregarImagenProducto( editProducto.idProducto, imagenes ) )
        } else {
            setImagenesCrear(filesBase64 as Array<{imagen: string}>)
        }
        
    }
    
    const eliminarImagen = ( idImagen : number ) => {
        editProducto?.idProducto &&
            dispatch(ProductosAction.requestEliminarImagenProducto( idImagen, editProducto.idProducto ) )
    }

    useEffect(() => {
        dispatch(CategoriasAction.requestObtenerCategoriasLista())
    }, [dispatch]);

    useEffect(() => {

        if(!idCategoria) return

        console.log('aja')
        dispatch(ProductosAction.requestProductos(Number(idCategoria), paginatorHandler.pageSize, paginatorHandler.actualPage))
        dispatch(ProductosAction.setEditarProducto(null))
    }, [idCategoria, paginatorHandler.pageSize, paginatorHandler.actualPage , dispatch]);

    useEffect(() => {
        if(editProducto){
            setValue('nombre', editProducto.nombre)
            setValue('precio', editProducto.precio)
            setValue('descripcion', editProducto.descripcion)
        }
    }, [editProducto, setValue]);

    const validarSubmit = (e : any) => {
        e.preventDefault()
        if(editProducto?.idProducto){
            handleSubmit(handleGuardar)()
        }
        else if( imagenesCrear && imagenesCrear?.length > 0 ){
            handleSubmit(handleGuardar)()
        }else{
            dispatch( AlertaAction.setAlerta({show: true, message: 'Debe ingresar al menos una imagen', variant: 'danger', title:'Error'}) )
        }

    }

    return (
        <>
            <Form onSubmit={validarSubmit}>
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
                            imagenes={editProducto?.imagenes || imagenesCrear || null}
                            agregarImagen={agregarImagen}
                            eliminarImagen={eliminarImagen}
                        />
                        {
                            !editProducto?.idProducto && imagenesCrear &&
                                <p className="text-danger" style={{textAlign: 'right'}}>Vista Previa</p>
                        }
                    </div>

                    <div className="col-12 d-flex justify-content-around align-items-center mt-3">
                        <button type="button" className="btn btn-secondary text-white w-25" onClick={handleCancelar} > Cancelar </button>
                        <button type="submit" className="btn btn-admin--yellow w-25"> {!editProducto?.idProducto ? 'Crear' : 'Editar'} </button>
                    </div>

                </div>


            </Form>
        </>
    )
}

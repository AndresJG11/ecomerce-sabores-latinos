import { FC, useEffect, useState } from 'react'
import { Categoria } from "models";
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import { Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import CategoriasAction from 'stores/categorias/categoriasAction';
import AlertaAction from 'stores/alerta/alertaAction';

const ValidationSchema: Record<string, RegisterOptions> = {
    nombre: { required: 'Debes ingresar un nombre a la categoría' },
    icono: { required: false }
}

interface FormCategoryProps {

    // readonly Categoria?: Partial<Categoria> | null
    readonly Categoria : Categoria | null

    readonly cancelSelect: VoidFunction

    readonly actualPage : number

    readonly pageSize : number

}

export const FormCategory: FC<FormCategoryProps> = ({ Categoria, cancelSelect, actualPage, pageSize }) => {

    const { register, handleSubmit, errors, setValue, clearErrors } = useForm({ mode: 'onBlur' });

    const [newFile, setNewFile] = useState<string | null>(null)

    const dispatch = useDispatch()

    useEffect(() => {

        setValue('nombre', Categoria?.nombre)
        setNewFile(Categoria?.icono || null)

    }, [Categoria, setValue]);

    const handleCancel = () => {
        cancelSelect()
        setValue('icono', null)
        setValue('nombre', null)
        setNewFile(null)
        clearErrors()
    }

    const onSubmit: SubmitHandler<Record<string, any>> = (data) => {
        const { nombre } = data

        const formData = new FormData();

        newFile && formData.append('file', newFile )

        if( Categoria?.idCategoria ){
            /* Actualizar Categoría */
            newFile &&
                dispatch( CategoriasAction.requestActualizarCategoria(nombre, newFile, Categoria.idCategoria, {actualPage, pageSize}) )

            handleCancel()
        }else{
            /* Crear Categoría */
            if(newFile){
                dispatch(CategoriasAction.requestAgregarCategoria(newFile!, nombre as string, {actualPage, pageSize}))
                handleCancel()
            }else{
                dispatch( AlertaAction.setAlerta({show: true, message: 'Debe seleccionar un icono para la categoría', variant: 'danger', title:'Error'}) )
            }
        }
    }

    const onUploadIcon = (event: any) => {

        const { target: { files } } = event

        if (!files) return

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setNewFile(fileReader.result as string)
        }

        fileReader.readAsDataURL(files[0])

    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} >

            <FormGroup className="mb-4">
                <FormLabel>Nombre</FormLabel>
                <FormControl
                    type="text"
                    ref={register(ValidationSchema.nombre)}
                    name="nombre"
                    isInvalid={Boolean(errors.nombre)}
                />
                {errors.nombre && <FormControl.Feedback type="invalid">{errors.nombre.message}</FormControl.Feedback>}
            </FormGroup>

            <FormGroup>
                <FormLabel>Icono</FormLabel>
                <Form.File
                    id="custom-file"
                    accept=".png, .svg"
                    ref={register(ValidationSchema.icono)}
                    isInvalid={Boolean(errors.icono)}
                    name="icono"
                    onChange={onUploadIcon}
                />
                {errors.icono && <FormControl.Feedback type="invalid">{errors.icono.message}</FormControl.Feedback>}
            </FormGroup>

            {
                newFile &&
                    <div className="d-flex justify-content-center mt-3">
                        <img src={newFile} alt="" style={{ width: 100 }} />
                    </div>
            }

            <div className="d-flex justify-content-around">
                <button onClick={() => handleCancel()} className="btn btn-secondary text-white d-block mt-5" type="button">
                    Cancelar
                </button>
                <button className="btn btn-admin--yellow d-block mt-5" type="submit">
                    {Categoria?.idCategoria ? `Editar ${Categoria.nombre}` : 'Crear'}
                </button>
            </div>

        </Form>
    )
}

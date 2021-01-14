import { FC, useEffect, useState } from 'react'
import { Categoria } from "models";
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import { Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import CategoriasAction from 'stores/categorias/categoriasAction';
import { imagesURL } from 'environments/base'

const ValidationSchema: Record<string, RegisterOptions> = {
    nombre: { required: 'Debes ingresar un nombre a la categoría' },
    icono: { required: false }
}

interface FormCategoryProps {

    readonly Categoria?: Partial<Categoria> | null

    readonly cancelSelect: VoidFunction

}

export const FormCategory: FC<FormCategoryProps> = ({ Categoria, cancelSelect }) => {

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

        if (newFile) {
            formData.append('nombre', nombre)
            formData.append('file', newFile)

            Categoria?.idCategoria ?
                dispatch(CategoriasAction.requestAgregarCategoria(formData))
                : dispatch(CategoriasAction.requestActualizarCategoria(formData))

            handleCancel()
        }

    }

    const onUploadIcon = (event: any) => {

        const { target: { files } } = event

        if (files.length > 0) {
            const fileReader: FileReader = new FileReader();

            fileReader.onload = function () {
                setNewFile(fileReader.result as string | null)
            }

            fileReader.readAsDataURL(files[0]);
        } else {
            setNewFile(null)
        }

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
                    <img src={newFile.includes('data:image') ? newFile : imagesURL + newFile} alt="" style={{ width: 50 }} />
                </div>
            }

            <div className="d-flex justify-content-around">
                <button onClick={() => handleCancel()} className="btn btn-secondary text-white d-block mt-5" type="button">
                    Cancelar
                </button>
                {/* Validar actualización, se debe re convertir para volver a subir */}
                <button className="btn btn-admin--yellow d-block mt-5" type="submit" disabled>
                    {Categoria?.idCategoria ? `Editar ${Categoria.nombre}` : 'Crear'}
                </button>
            </div>

        </Form>
    )
}

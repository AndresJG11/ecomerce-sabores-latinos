import { ActualizarSistema } from 'models/System'
import {FC} from 'react'
import {Form, FormGroup, FormControl, FormLabel} from 'react-bootstrap'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import SistemaAction from 'stores/sistema/sistemaAction'
import { useDispatch } from 'react-redux'

const ValidationSchema: Record<string, RegisterOptions> = {
    correo: { required: false },
    direccion: { required: false },
    telefono: { required: false },
    whatsapp: { required: false },
    facebook: { required: false },
    instagram: { required: false },
}

export const ParameterManagement : FC<{}> = () => {

    const { register, handleSubmit, errors } = useForm({ mode: 'onBlur' });

    const dispatch = useDispatch()

    const onSubmit : SubmitHandler<Record<string, any>> = (data) => {

        const actualizarSistema : ActualizarSistema = {
            id: 0,
            correo: data.correo,
            direccion: data.direccion,
            telefono: data.telefono,
            whatsapp: data.whatsapp,
            facebook: data.facebook,
            instagram: data.instagram,
        }

        dispatch( SistemaAction.requestActualizarSistema(actualizarSistema) )

    }

    return (
        <div>
            <h5> Administrar Parámetros </h5>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <FormGroup>
                    <FormLabel>Correo</FormLabel>
                    <FormControl
                        type="text"
                        ref={register(ValidationSchema.correo)}
                        name="correo"
                        isInvalid={Boolean(errors.correo)}
                    />
                    {errors.correo && <FormControl.Feedback type="invalid">{errors.correo.message}</FormControl.Feedback>}
                </FormGroup>
                
                <FormGroup>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl
                        type="text"
                        ref={register(ValidationSchema.telefono)}
                        name="telefono"
                        isInvalid={Boolean(errors.telefono)}
                    />
                    {errors.telefono && <FormControl.Feedback type="invalid">{errors.telefono.message}</FormControl.Feedback>}
                </FormGroup>
                
                <FormGroup>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl
                        type="text"
                        ref={register(ValidationSchema.direccion)}
                        name="direccion"
                        isInvalid={Boolean(errors.direccion)}
                    />
                    {errors.direccion && <FormControl.Feedback type="invalid">{errors.direccion.message}</FormControl.Feedback>}
                </FormGroup>
                
                <FormGroup>
                    <FormLabel>Facebook</FormLabel>
                    <FormControl
                        type="text"
                        ref={register(ValidationSchema.facebook)}
                        name="facebook"
                        isInvalid={Boolean(errors.facebook)}
                    />
                    {errors.facebook && <FormControl.Feedback type="invalid">{errors.facebook.message}</FormControl.Feedback>}
                </FormGroup>
                
                <FormGroup>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl
                        type="text"
                        ref={register(ValidationSchema.instagram)}
                        name="instagram"
                        isInvalid={Boolean(errors.instagram)}
                    />
                    {errors.instagram && <FormControl.Feedback type="invalid">{errors.instagram.message}</FormControl.Feedback>}
                </FormGroup>
                
                <FormGroup>
                    <FormLabel>WhatsApp</FormLabel>
                    <FormControl
                        type="text"
                        ref={register(ValidationSchema.whatsapp)}
                        name="whatsapp"
                        isInvalid={Boolean(errors.whatsapp)}
                    />
                    {errors.whatsapp && <FormControl.Feedback type="invalid">{errors.whatsapp.message}</FormControl.Feedback>}
                </FormGroup>

                <button className="btn btn-admin--yellow d-block mt-5 mx-auto w-25" type="submit">
                    Guardar
                </button>

            </Form>
        </div>
    )
}

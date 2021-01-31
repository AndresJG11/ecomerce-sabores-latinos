import { Sistema } from 'models/System'
import { FC, useEffect } from 'react'
import { Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import SistemaAction from 'stores/sistema/sistemaAction'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";

const ValidationSchema: Record<string, RegisterOptions> = {
    correo: { required: false },
    direccion: { required: false },
    telefono: {
        required: false,
        pattern: {
            value: /^[0.9]+$/,
            message: 'Debe ingresar un número valido'
        }
    },
    whatsapp: {
        required: false,
        pattern: {
            value: /^[0.9]+$/,
            message: 'Debe ingresar un número valido'
        }
    },
    facebook: { required: false },
    instagram: { required: false },
}

export const ParameterManagement: FC<{}> = () => {

    const { register, handleSubmit, errors, setValue } = useForm({ mode: 'onBlur' });

    const dispatch = useDispatch()

    const sistema: Sistema = useSelector((state: any) => state.SistemaReducer.parametrosSistema);

    const onSubmit: SubmitHandler<Record<string, any>> = (data) => {

        const actualizarSistema: Sistema = {
            id: sistema.id,
            correo: data.correo,
            direccion: data.direccion,
            telefono: data.telefono,
            whatsapp: data.whatsapp,
            facebook: data.facebook,
            instagram: data.instagram,
        }

        dispatch(SistemaAction.requestActualizarSistema(actualizarSistema))
    }

    useEffect(() => {
        dispatch(SistemaAction.requestObtenerSistema())
    }, [dispatch]);

    useEffect(() => {

        if (!sistema) return

        setValue('correo', sistema.correo)
        setValue('direccion', sistema.direccion)
        setValue('telefono', sistema.telefono)
        setValue('whatsapp', sistema.whatsapp)
        setValue('facebook', sistema.facebook)
        setValue('instagram', sistema.instagram)
        // eslint-disable-next-line
    }, [sistema]);

    return (
        <div>
            <h5> Administrar Parámetros </h5>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <div className="row mt-3">

                    <div className="col-6">
                        <h6> Contacto </h6>
                        <FormGroup className="mb-3">
                            <FormLabel>Correo</FormLabel>
                            <FormControl
                                type="text"
                                ref={register(ValidationSchema.correo)}
                                name="correo"
                                isInvalid={Boolean(errors.correo)}
                            />
                            {errors.correo && <FormControl.Feedback type="invalid">{errors.correo.message}</FormControl.Feedback>}
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl
                                type="text"
                                ref={register(ValidationSchema.telefono)}
                                name="telefono"
                                isInvalid={Boolean(errors.telefono)}
                            />
                            {errors.telefono && <FormControl.Feedback type="invalid">{errors.telefono.message}</FormControl.Feedback>}
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FormLabel>Dirección</FormLabel>
                            <FormControl
                                type="text"
                                ref={register(ValidationSchema.direccion)}
                                name="direccion"
                                isInvalid={Boolean(errors.direccion)}
                            />
                            {errors.direccion && <FormControl.Feedback type="invalid">{errors.direccion.message}</FormControl.Feedback>}
                        </FormGroup>
                    </div>

                    <div className="col-6">
                        <h6> Redes </h6>
                        <FormGroup className="mb-3">
                            <FormLabel>Facebook</FormLabel>
                            <FormControl
                                type="text"
                                ref={register(ValidationSchema.facebook)}
                                name="facebook"
                                isInvalid={Boolean(errors.facebook)}
                            />
                            {errors.facebook && <FormControl.Feedback type="invalid">{errors.facebook.message}</FormControl.Feedback>}
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FormLabel>Instagram</FormLabel>
                            <FormControl
                                type="text"
                                ref={register(ValidationSchema.instagram)}
                                name="instagram"
                                isInvalid={Boolean(errors.instagram)}
                            />
                            {errors.instagram && <FormControl.Feedback type="invalid">{errors.instagram.message}</FormControl.Feedback>}
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FormLabel>WhatsApp</FormLabel>
                            <FormControl
                                type="text"
                                ref={register(ValidationSchema.whatsapp)}
                                name="whatsapp"
                                isInvalid={Boolean(errors.whatsapp)}
                            />
                            {errors.whatsapp && <FormControl.Feedback type="invalid">{errors.whatsapp.message}</FormControl.Feedback>}
                        </FormGroup>
                    </div>

                </div>

                <button className="btn btn-admin--yellow d-block mt-5 mx-auto w-25" type="submit">
                    Guardar
                </button>

            </Form>
        </div>
    )
}

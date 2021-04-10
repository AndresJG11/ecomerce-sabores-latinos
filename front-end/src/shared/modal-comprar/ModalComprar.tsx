import { productoCarrito } from 'models';
import { DetallesVenta } from 'models/Ventas/VentasTypes';
import { FC } from 'react';
import { Modal, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { handlerCarrito } from 'utilities/handlerCarrito';

interface ModalComprarProps {
    readonly show: boolean,
    readonly setShow: Function,
}

const ValidationSchema: Record<string, RegisterOptions> = {
    fullName: { required: 'Debes indicarnos tus nombres y apellidos' },
    document: { required: 'Agrega tu documento' },
    phone: { required: 'Agrega tu numero de contacto' },
    address: { required: 'Donde quieres recibir el producto' }
}

export const ModalComprar: FC<ModalComprarProps> = ({ show, setShow }) => {

    const { register, handleSubmit, errors } = useForm({ mode: 'onBlur' });

    const dispatch = useDispatch()

    const productosCarrito : Array<productoCarrito> = useSelector((state: any) => state.CarritoReducer.productosCarrito);

    const onSubmit : SubmitHandler<Record<string,any>> = (data) => {

        const detallesVenta : DetallesVenta = {
            cliente:{
                direccion: data.address,
                documento: data.document,
                id: null,
                nombre: data.fullName,
                telefono: data.phone
            },
            detallesVenta: productosCarrito.map( ({cantidad, idProducto}) => ( {cantidad, idProducto} ) )
        }

        handlerCarrito.realizarCompra(detallesVenta, dispatch)

        setShow(false)
    }

    return (
        <Modal show={show} onHide={setShow} size="lg">
            <Modal.Header>
                <Modal.Title>Completa tu compra</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className="container" onSubmit={handleSubmit(onSubmit)}>

                    <FormGroup className="mb-3">
                        <FormLabel>Nombres y apellidos</FormLabel>
                        <FormControl
                            type="text"
                            ref={register(ValidationSchema.fullName)}
                            name="fullName"
                            isInvalid={Boolean(errors.fullName)}
                            autoComplete="off"
                        />
                        {errors.fullName && <FormControl.Feedback type="invalid">{errors.fullName.message}</FormControl.Feedback>}
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <FormLabel>Documento</FormLabel>
                        <FormControl
                            type="number"
                            ref={register(ValidationSchema.document)}
                            name="document"
                            isInvalid={Boolean(errors.document)}
                            autoComplete="off"
                        />
                        {errors.document && <FormControl.Feedback type="invalid">{errors.document.message}</FormControl.Feedback>}
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl
                            type="number"
                            ref={register(ValidationSchema.phone)}
                            name="phone"
                            isInvalid={Boolean(errors.phone)}
                            autoComplete="off"
                        />
                        {errors.phone && <FormControl.Feedback type="invalid">{errors.phone.message}</FormControl.Feedback>}
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <FormLabel>Dirección</FormLabel>
                        <FormControl
                            type="text"
                            ref={register(ValidationSchema.address)}
                            name="address"
                            isInvalid={Boolean(errors.address)}
                            autoComplete="off"
                        />
                        {errors.address && <FormControl.Feedback type="invalid">{errors.address.message}</FormControl.Feedback>}
                    </FormGroup>

                    <div className="d-flex justify-content-around align-items-center mt-3">
                        <button type="button" className="mr-5 btn btn-secondary text-white" onClick={() => setShow(false)}>Cancelar</button>
                        <button type="submit" className="btn primary btn-success text-white">Comprar</button>
                    </div>

                </Form>
            </Modal.Body>

        </Modal>
    )
}

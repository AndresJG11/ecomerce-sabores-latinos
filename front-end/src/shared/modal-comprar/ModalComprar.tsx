import { FC } from 'react';
import { Modal, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'

interface ModalComprarProps {
    readonly show: boolean,
    readonly setShow: Function,
}

export const ModalComprar: FC<ModalComprarProps> = ({ show, setShow }) => {

    return (
        <Modal show={show} onHide={setShow} size="lg">
            <Modal.Header>
                <Modal.Title>Completa tu compra</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className="container">
                    <FormGroup>
                        <FormLabel>Nombres y apellidos</FormLabel>
                        <FormControl
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Documento</FormLabel>
                        <FormControl
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Dirección</FormLabel>
                        <FormControl
                            type="text"
                        />
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

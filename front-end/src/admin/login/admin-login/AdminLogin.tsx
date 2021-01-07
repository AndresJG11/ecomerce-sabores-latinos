import {FC} from 'react'
import { Card, FormGroup, FormControl, FormLabel, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import {Routes} from 'constantes'
import './admin-login-styles.css'

const {
    Header, Body, Title
} = Card

const ValidationSchema = {
    // usuario : {required: 'Ingrese el usuario'},
    // password : {required: 'Ingrese la contraseña'}
    usuario : {required: false},
    password : {required: false}
}

export const AdminLogin : FC = () => {

    const {register, handleSubmit, errors} = useForm({mode: 'onBlur'});

    const history = useHistory()

    const onSubmit = (data : Record<string, string>) =>{

        const { usuario, password } = data

        usuario === '' && password === '' && history.push(Routes.adminHome) 
    }

    return (
        <div className="admin-login--container">
            <Card className="admin-login--card">
                <Header>
                    <Title> Inicio de sesión para administradores </Title>
                </Header>
                <Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup className="mb-4">
                            <FormLabel> Usuario </FormLabel>
                            <FormControl 
                                type="text"
                                name="usuario"
                                ref={register(ValidationSchema.usuario)}
                                isInvalid={Boolean(errors.usuario)}
                            />
                            {errors.usuario && <FormControl.Feedback type="invalid">{errors.usuario.message}</FormControl.Feedback>}
                        </FormGroup>
                        <FormGroup>
                            <FormLabel> Contraseña </FormLabel>
                            <FormControl 
                                type="password"
                                name="password"
                                ref={register(ValidationSchema.password)}
                                isInvalid={Boolean(errors.password)}
                                />
                        {errors.password && <FormControl.Feedback type="invalid">{errors.password.message}</FormControl.Feedback>}
                        </FormGroup>
                        <button type="submit" className="btn btn-info mt-5 mx-auto d-block px-5 text-white"> Ingresar </button>
                    </Form>
                </Body>
            </Card>
        </div>
    )
}

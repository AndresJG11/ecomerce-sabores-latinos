import {VFC} from 'react'
import { WrapperCardAdminLP } from '../components/wrapper-card/WrapperCardAdminLP'

export const AdminLadingPage : VFC = () => {
    return (
        <div className="container">
            <div className="mb-4">
                <h1>Bienvenido Administrador</h1>
                <h4>Sistema para gestión del ecommerce</h4>
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <WrapperCardAdminLP />
            </div>
        </div>
    )
}

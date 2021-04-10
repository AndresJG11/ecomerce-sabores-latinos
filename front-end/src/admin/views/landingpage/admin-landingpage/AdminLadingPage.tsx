import {VFC} from 'react'
import { WrapperCardAdminLP } from '../components/wrapper-card/WrapperCardAdminLP'

export const AdminLadingPage : VFC = () => {
    return (
        <div className="p-5 h-100">
            <div>
                <h1>Bienvenido Administrador</h1>
                <h4>Sistema para gestión del ecommerce</h4>
            </div>
            <div className="h-75 d-flex align-items-center justify-content-center">
                <WrapperCardAdminLP />
            </div>
        </div>
    )
}

import {FC} from 'react'
import './CardAdminLP-styles.css'
import { CardAdminLPProps } from './CardAdminLPProps'

export const CardAdminLP : FC<CardAdminLPProps> = ({title, icon, to}) => {
    return (
        <div className="container-card-LP" onClick={() => { window.location.pathname = to } }>
            <h5> {title} </h5>
            <img src={icon} alt="icon" title={title} />
        </div>
    )
}

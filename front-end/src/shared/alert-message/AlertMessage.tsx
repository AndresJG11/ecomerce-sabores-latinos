import { VFC, useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import './alert-message-styles.css'
import { AlertMessageType } from 'shared/alert-message/models'
import { useDispatch, useSelector } from 'react-redux'
import AlertaAction from 'stores/alerta/alertaAction'

export const AlertMessage: VFC = () => {

    const dispatch = useDispatch()

    const {title, message, variant} : AlertMessageType = useSelector((state: any) => state.AlertaReducer);

    useEffect(() => {
        setTimeout( () => {
            dispatch( AlertaAction.setAlerta( {show: false, message: '', variant: ''} ) )
        }, 5000 )
        // eslint-disable-next-line
    }, []);
    
    return (
        <div className="wrapper-alert-message">
            <Alert variant={variant} >
                <Alert.Heading>
                    {title}
                </Alert.Heading>
                <span>
                    {message}
                </span>
            </Alert>
        </div>
    )
}

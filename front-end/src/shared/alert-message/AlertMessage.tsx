import { VFC, useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import './alert-message-styles.css'
import { AlertMessageType } from 'shared/alert-message/models'
import { useDispatch, useSelector } from 'react-redux'
import AlertaAction from 'stores/alerta/alertaAction'

export const AlertMessage: VFC = () => {

    const dispatch = useDispatch()

    const {title, message, variant, show} : AlertMessageType = useSelector((state: any) => state.AlertaReducer);

    useEffect(() => {
        show === true &&
            setTimeout( () => {
                dispatch( AlertaAction.setAlerta( {show: false, message: '', variant: '', title:''} ) )
            }, 3000 )    
    }, [show, dispatch]);
    
    return (
        show ?
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
        : <></>
    )
}

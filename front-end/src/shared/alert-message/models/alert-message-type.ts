import { AlertProps } from 'react-bootstrap'

export interface AlertMessageType extends AlertProps {
    readonly message : string,
    readonly title ? : string,
}
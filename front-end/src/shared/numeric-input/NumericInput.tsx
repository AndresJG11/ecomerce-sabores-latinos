import {FC} from 'react'
import './numeric-input-styles.css'

interface NumericInputProps {
    readonly setValue : Function,
    readonly value : number
}

export const NumericInput : FC<NumericInputProps> = ({value, setValue}) => {
    return (
        <div className="d-inline-block">
            <span className="input-number-decrement" onClick={() => value > 0 && setValue(value-1)}>–</span>
            <input className="input-number" type="text" value={value} min="0" max="10" onChange={({target: {value}}) => setValue(value) } />
            <span className="input-number-increment" onClick={()=>setValue(value+1)} >+</span>
        </div>
    )
}

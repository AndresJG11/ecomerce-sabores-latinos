import { FC, useState, useRef, useEffect } from 'react'
import './product-images-styles.css'

interface ProductImagesProps {
    readonly imagenes: Array<string> | null
}


export const ProductImages: FC<ProductImagesProps> = ({ imagenes }) => {

    const [selected, setSelected] = useState<number>(0);

    const [listHeight, setListHeight] = useState<number>(300);

    const refImagen = useRef< HTMLImageElement >(null)

    useEffect(() => {
        
        const {current} = refImagen

        setListHeight(current?.clientWidth || 300)

    }, [refImagen?.current?.width])

    useEffect(() => {
        setSelected(0)
    }, [imagenes])

    return (
        <div className="row">
            <div className="col-3">
                <ul className="imagenes-lista" style={{height: listHeight}}>
                    {
                        imagenes && imagenes.map( (imagen, idx: number) =>
                            <li key={idx}>
                                <img src={imagen} alt="" className={`imagen-producto--lista ${idx===selected && 'active'}`} onMouseEnter={() => setSelected(idx)} />
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="col-9">
                {
                    imagenes &&
                        !!imagenes[selected]  &&
                            <img ref={refImagen} src={ imagenes[selected] } alt="" className="detalle-imagen-producto--selected" style={{height: refImagen?.current?.width }} />
                }
            </div>
        </div>
    )
}
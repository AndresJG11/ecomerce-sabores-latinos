import { imagesURL } from 'environments/base';
import { FC, useState, useRef, useLayoutEffect } from 'react'
import './product-images-styles.css'

interface ProductImagesProps {
    readonly imagenes: Array<string> | null
}


export const ProductImages: FC<ProductImagesProps> = ({ imagenes }) => {

    const [selected, setSelected] = useState<number>(0);

    const [listHeight, setListHeight] = useState<number>(300);

    const refImagen = useRef< HTMLImageElement >(null)

    useLayoutEffect(() => {
        
        const {current} = refImagen

        setListHeight(current?.clientWidth || 300)

    }, [refImagen])

    return (
        <div className="row">
            <div className="col-3">
                <ul className="imagenes-lista" style={{height: listHeight}}>
                    {
                        imagenes && imagenes.map( (imagen, idx: number) =>
                            <li key={idx}>
                                <img src={ imagesURL + imagen} alt="" className={`imagen-producto--lista ${idx===selected && 'active'}`} onMouseEnter={() => setSelected(idx)} />
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="col-9">
                {
                    imagenes &&
                        <img ref={refImagen} src={ imagesURL + imagenes[selected]} alt="" className="detalle-imagen-producto--selected" style={{height: refImagen?.current?.width }} />
                }
            </div>
        </div>
    )
}
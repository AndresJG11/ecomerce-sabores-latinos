import { FC, useState, useRef, useLayoutEffect } from 'react'
import { imagesURL } from 'environments/base';
import AgregarImagen from 'assets/images/agregar_imagen.png'
import EliminarIcono from 'assets/icons/eliminar.svg'
import './crud-imagenes-styles.css'

interface CRUDImagenesProps {

    readonly imagenes: Array<{ idImagen: number, imagen: string }> | null

    agregarImagen: (e: React.ChangeEvent<HTMLInputElement>) => void

    eliminarImagen : ( idImagen : number ) => void

}

export const CRUDImagenes: FC<CRUDImagenesProps> = ({ imagenes, agregarImagen, eliminarImagen }) => {

    const [selected, setSelected] = useState<number>(0);

    const refImagen = useRef< HTMLDivElement >(null)

    const [listHeight, setListHeight] = useState<number>(300);

    useLayoutEffect(() => {
        
        const {current} = refImagen

        setListHeight(current?.clientWidth || 300)

    }, [refImagen])

    return (
        <div className="row">
            <div className="col-3">
                <ul className="imagenes-lista" style={{height: listHeight}}>
                    {
                        <li className="mb-0">
                            <label>
                                <input type="file" id="file" style={{ display: 'none' }} onChange={agregarImagen} accept="image/*" />
                                <img src={AgregarImagen} alt="" className='imagen-producto--lista' title="Agregar Imagen" />
                            </label >
                        </li>
                    }
                    <hr className="w-75 border border-dark"/>
                    {
                        imagenes && imagenes.length > 0 && imagenes.map(({ imagen }, idx: number) =>
                            <li key={idx}>
                                <img src={imagesURL + imagen} alt="" className={`imagen-producto--lista ${idx === selected && 'active'}`} onMouseEnter={() => setSelected(idx)} />
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="col-9">
                {
                    imagenes && imagenes.length > 0 &&
                        <div className="imagen-producto-selected--container" ref={refImagen}>
                            <img src={imagesURL + imagenes[selected].imagen} alt="" className="imagen-producto--selected" />
                            <img src={EliminarIcono} alt="" className="imagen-producto--delete" title="Eliminar imagen" onClick={() => eliminarImagen(imagenes[selected].idImagen)} />
                        </div>
                }
            </div>
        </div>
    )
}

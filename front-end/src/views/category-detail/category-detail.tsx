import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import { getCategoriesByID } from "services";
import { Category } from "models"


export const CategoryDetail = () => {

    const [datosCategoria, setDatosCategoria] = useState<Category | null>(null);

    const {id} : {id: string} = useParams()

    useEffect(() => {
        setDatosCategoria( getCategoriesByID( Number(id) ))
    }, [id]);

    return (
        <div>
            <h1> { datosCategoria?.nombre } </h1>
            
        </div>
    )
}

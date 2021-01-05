import { useParams } from "react-router-dom";

export const CategoryDetail = () => {

    const {id} : {id: string} = useParams()

    return (
        <div>
            <h1> Categoria: { id } </h1>
        </div>
    )
}

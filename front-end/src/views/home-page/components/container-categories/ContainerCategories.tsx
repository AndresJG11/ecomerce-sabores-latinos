import { Categoria } from "models";
import { useSelector } from "react-redux";
import { WrapperCategory } from "views/components";

export const ContainerCategories = () => {

    const categorias : Array<Categoria> = useSelector((state: any) => state.CategoriasReducer.categoriasHome);

    const numCategorias = window.mobileCheck() ? 4 : categorias?.length || 0;

    return (
        <div>
            {
                categorias && categorias.slice(0, numCategorias).map((categoria: Categoria, i: number) =>
                    <div key={i}>
                        <WrapperCategory
                            title={`${categoria.nombre}`}
                            productos={categoria.productos}
                            idCategoria={ categoria.idCategoria }
                        />
                    </div>)
            }
        </div>
    )
}

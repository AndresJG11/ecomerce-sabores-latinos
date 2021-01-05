import { NavBarCategories, BannerHomepage, CardInfo } from "views/home-page/components"
import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import CategoriasAction from "stores/categorias/categoriasAction"
import { ContainerCategories } from "./components/container-categories"


export const HomePage = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(CategoriasAction.requestCategoriasHome())
    dispatch(CategoriasAction.requestCategoriasLista())
  }, [dispatch]);

  return (
    <div className="App">
      <div>

        <NavBarCategories />

        <BannerHomepage />

        <CardInfo />

        <ContainerCategories />

      </div>
    </div>
  );
}


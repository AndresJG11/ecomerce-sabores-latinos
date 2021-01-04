import { NavBarCategories, BannerHomepage, CardInfo } from "views/home-page/components"
import { WrapperCategory } from 'views/components'
import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import CategoriasAction from "stores/categorias/categoriasAction"


export const HomePage = () => {

  const dispatch = useDispatch()

  const getCategories = () => {

    let components = []

    const numCategorias = window.mobileCheck() ? 4 : 10; 

    for (let i = 0; i < numCategorias; i++) {
      components.push(
        <div key={i}>
          <WrapperCategory
            title={`Conoce más productos de ${i}`}
          />
        </div>
      )
    }

    return components

  }

  useEffect(() => {
    dispatch( CategoriasAction.requestCategorias() )
  }, []);

  return (
    <div className="App">
      <div>

        <NavBarCategories />

        <BannerHomepage />

        <CardInfo />

        {getCategories()}


      </div>
    </div>
  );
}


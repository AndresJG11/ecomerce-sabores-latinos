import { NavBarCategories, BannerHomepage } from "views/home-page/components"
import { WrapperCategory } from 'views/components'

export const HomePage = () => {

  const getCategories = () => {

    let components = []

    for (let i = 0; i < 4; i++) {
      components.push(
        <div className="category-item">
          <WrapperCategory
            title={`Conoce más productos de ${i}`}
          />
        </div>
      )
    }

    return components

  }

  return (
    <div className="App">
      <div>

        <NavBarCategories />

        <BannerHomepage />

        {getCategories()}


      </div>
    </div>
  );
}


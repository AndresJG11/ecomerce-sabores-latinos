import { NavBarCategories, BannerHomepage, CardInfo } from "views/home-page/components"
import { WrapperCategory } from 'views/components'

export const HomePage = () => {

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


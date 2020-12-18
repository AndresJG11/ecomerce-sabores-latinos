import { NavBarCategories, BannerHomepage } from "views/home-page/components"
import {CategoriesSlider } from 'views/categories-slider'

export const HomePage = () => {
  return (
    <div className="App">
      <div>
        <NavBarCategories />
        <BannerHomepage />
        <CategoriesSlider />
        <CategoriesSlider />
        
      </div>
    </div>
  );
}


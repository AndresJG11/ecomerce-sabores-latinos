import { useRef } from 'react'
import { CategoryCard } from "views/category-card"
import ChevronRight from 'assets/icons/chevron-right.svg'
import ChevronLeft from 'assets/icons/chevron-left.svg'
import './category-slider-styles.css'

export const CategoriesSlider = () => {

    const sliderRef = useRef<any>()

    const handleSliderScroll = (direction: "left" | "right") => {
        const { current } = sliderRef

        current?.scrollBy({ behavior: "smooth", left: direction === "right" ? 1080 : -1080, top: 0 })
    }

    const getItems = () => {

        let components = []

        for (let i = 0; i < 30; i++) {
            components.push(
                <div className="category-item">
                    <CategoryCard
                        image={'//img-s-msn-com.akamaized.net/tenant/amp/entityid/BB19xtUs?w=300&h=174&q=60&m=6&f=jpg&u=t'}
                        title={i+' Titulo para producto 200 gr x1 unidad'}
                        text={'Esta sería la descripción de algún producto, soy un texto para leer y completar espacios de prueba en esta tarjeta'}
                        price={3000 as number}
                    />
                </div>
            )
        }

        return components
    }

    return (
        <div className="categories-slider--wraper">
            <div className="nav-slider nav-slider--left" onClick={() => handleSliderScroll("left")}>
                <img style={{ width: 30 }} id="left" alt="chevron nav" src={ChevronLeft} />
            </div>
            <div ref={sliderRef} className="d-flex my-4 mb-5 w-100 categories-slider">
                {getItems()}
            </div>
            <div className="nav-slider nav-slider--right"  onClick={() => handleSliderScroll("right")} >
                <img style={{ width: 30 }} id="right" alt="chevron nav" src={ChevronRight}/>
            </div>
        </div>
    )
}

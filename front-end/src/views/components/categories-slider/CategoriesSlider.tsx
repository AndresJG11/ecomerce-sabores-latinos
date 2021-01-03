import { useRef, useState, FC } from 'react'
import { CategoryCard } from "views/components"
import ChevronRight from 'assets/icons/chevron-right.svg'
import ChevronLeft from 'assets/icons/chevron-left.svg'
import './category-slider-styles.css'

export const CategoriesSlider : FC<any> = () => {

    const sliderRef = useRef<any>()

    const [chevrons, setChevrons] = useState<any>({leftVisibility: 'd-none', rightVisibility: ''})

    const handleSliderScroll = (direction: "left" | "right") => {
        const { current } = sliderRef

        const elementWidth = 270

        const elementsOnScreen =  Math.floor( current.clientWidth / elementWidth )

        const scroll = elementWidth * elementsOnScreen
        
        current?.scrollBy({ behavior: "smooth", left: direction === "right" ? scroll : -scroll, top: 0 })

    }
    
    const handleScroll= (e : any) =>{
        const chev = 
        {
            leftVisibility: e.target.scrollLeft === 0 ? 'd-none' : '',
            rightVisibility: e.target.scrollWidth-e.target.scrollLeft-e.target.clientWidth === 0 ? 'd-none' : '',
        }
    
        setChevrons(chev)
    }

    const getItems = () => {

        let components = []

        const numberCards = window.mobileCheck() ? 4 : 30;


        for (let i = 0; i < numberCards; i++) {
            components.push(
                <div className="category-item" key={i} >
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
            {console.log(chevrons)}
            <div className={`nav-slider nav-slider--left ${chevrons.leftVisibility}`} onClick={() => handleSliderScroll("left")}>
                <img style={{ width: 30 }} id="left" alt="chevron nav" src={ChevronLeft} />
            </div>
            <div ref={sliderRef} onScroll={handleScroll} className="d-flex w-100 categories-slider">
                {getItems()}
            </div>
            <div className={`nav-slider nav-slider--right ${ chevrons.rightVisibility }`}  onClick={() => handleSliderScroll("right")} >
                <img style={{ width: 30 }} id="right" alt="chevron nav" src={ChevronRight}/>
            </div>
        </div>
    )
}

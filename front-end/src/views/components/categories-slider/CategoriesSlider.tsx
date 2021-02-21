import { useRef, useState, FC, useLayoutEffect } from 'react'
import { CategoryCard } from "views/components"
import ChevronRight from 'assets/icons/chevron-right.svg'
import ChevronLeft from 'assets/icons/chevron-left.svg'
import { Producto } from 'models/Products/Product'
import './category-slider-styles.css'

export const CategoriesSlider: FC<{productos : Array<Producto>, idCategoria: number}> = ({ productos, idCategoria }) => {
    
    const sliderRef = useRef<any>()

    const [chevrons, setChevrons] = useState<any>({ leftVisibility: 'd-none', rightVisibility: 'd-none' })

    const elementWidth = 320

    const handleSliderScroll = (direction: "left" | "right") => {
        const { current } = sliderRef

        const elementsOnScreen = Math.floor(current.clientWidth / elementWidth)

        const scroll = elementWidth * elementsOnScreen

        current?.scrollBy({ behavior: "smooth", left: direction === "right" ? scroll : -scroll, top: 0 })
    }

    const handleScroll = (e: any) => {
        const chev =
        {
            leftVisibility: e.target.scrollLeft === 0 ? 'd-none' : '',
            rightVisibility: e.target.scrollWidth - e.target.scrollLeft - e.target.clientWidth === 0 ? 'd-none' : '',
        }

        setChevrons(chev)
    }

    useLayoutEffect(() => {

        const { current } = sliderRef

        const isOverflow = productos?.length * elementWidth > current.clientWidth

        const chev = isOverflow ? { ...chevrons, rightVisibility: '' } : chevrons

        setChevrons(chev)

        // eslint-disable-next-line 
    }, [productos]);

    return (
        <div className="categories-slider--wraper">
            <div className={`nav-slider nav-slider--left ${chevrons.leftVisibility}`} onClick={() => handleSliderScroll("left")}>
                <img style={{ width: 30 }} id="left" alt="chevron nav" src={ChevronLeft} />
            </div>
            <div ref={sliderRef} onScroll={handleScroll} className="d-flex w-100 categories-slider">
                {
                    productos && productos.map(({ precio, nombre, imagenes, idProducto }: Producto, i: number) =>
                        <div className="category-item" key={i} >
                            <CategoryCard
                                imagenes={imagenes}
                                nombre={nombre}
                                precio={precio!}
                                idProducto={idProducto!}
                                idCategoria={idCategoria}
                            />
                        </div>
                    )
                }
            </div>
            <div className={`nav-slider nav-slider--right ${chevrons.rightVisibility}`} onClick={() => handleSliderScroll("right")} >
                <img style={{ width: 30 }} id="right" alt="chevron nav" src={ChevronRight} />
            </div>
        </div>
    )
}

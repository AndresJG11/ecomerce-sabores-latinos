import {Carousel} from 'react-bootstrap'
import './banner-homepage-styles.css'

import {useRef, useState, useLayoutEffect} from 'react'

export const BannerHomepage = () => {

    const carouselRef = useRef<{ element : HTMLDivElement }> (null)

    const [ carouselHeight, setCarouselHeight ] = useState (0)

    useLayoutEffect (() =>
    {
        const { current } = carouselRef

        if (current !== null)
        {
            const { offsetWidth } = current.element

            setCarouselHeight (Math.trunc (offsetWidth / 4))
        }
    }, [ carouselHeight ])

    return (
        <div className="carrousel-wraper">
            <Carousel 
                ref={ carouselRef as any }
                fade={true}
                interval={3000} 
                prevLabel={""}
                nextLabel={""}
            >
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Aspect-ratio-4.00x1.svg/1920px-Aspect-ratio-4.00x1.svg.png"
                        alt="First slide"
                        height={ carouselHeight }
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://images.squarespace-cdn.com/content/v1/545be5c4e4b0b773c733ca03/1422559059367-EXVLRQCG30OT3MXABVD1/ke17ZwdGBToddI8pDm48kD6B0hj0pC0U_ns_mUlqmh8UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcjnGyVxz4_7fGUBBocNlg5FJFs2U28j8wg_7g5x2b7zk68Qg-OIBKW5Hop4sS8Azz/Vancouver+Skyline+Long+Exposure+Pano+4-1+Ratio.jpg?format=1500w"
                        alt="Third slide"
                        height={ carouselHeight }
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.alex-kunz.com/wp-content/uploads/2020/01/Shiprock-Panorama-18-4509-980x245.jpg"
                        alt="Third slide"
                        height={ carouselHeight }
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

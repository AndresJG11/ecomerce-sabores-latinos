import {Carousel} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {useRef, useState, useLayoutEffect, useEffect} from 'react'
import './banner-homepage-styles.css'
import { Anuncio } from 'models';
import AnuncioAction from 'stores/anuncio/anuncioAction';

export const BannerHomepage = () => {

    const dispatch = useDispatch()

    const anuncios : Array<Anuncio> | null = useSelector((state: any) => state.AnuncioReducer.anuncios);

    const carouselRef = useRef<{ element : HTMLDivElement }> (null)

    const [ carouselHeight, setCarouselHeight ] = useState (0)

    useLayoutEffect (() =>
    {
        const { current } = carouselRef

        if (current !== null)
        {
            const { offsetWidth } = current.element

            setCarouselHeight( Math.trunc (offsetWidth / 4))
        }
    }, [ carouselHeight ])

    useEffect(() => {
        dispatch( AnuncioAction.requestObtenerAnuncios() )
    }, [dispatch]);

    return (
        <div className="carrousel-wraper">
            <Carousel 
                ref={ carouselRef as any }
                fade={true}
                interval={3000} 
                prevLabel={""}
                nextLabel={""}
                indicators={!window.mobileCheck()}
            >
                {
                    anuncios && anuncios?.map &&
                        anuncios.map( (anuncio, idx) =>
                            <Carousel.Item key={idx}>
                                <img
                                    className="d-block w-100"
                                    // src={ imagesURL + anuncio.ruta }
                                    src={ anuncio.imagen }
                                    alt={ anuncio.titulo }
                                    title={ anuncio.titulo }
                                    style={ anuncio?.enlace ? {cursor: 'pointer'} : {} }
                                    onClick={() => anuncio?.enlace && window.open( anuncio.enlace ) }
                                    height={ anuncios.length > 0 ? carouselHeight : 0}
                                />
                            </Carousel.Item>
                        )
                }
            </Carousel>
        </div>
    )
}

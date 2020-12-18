import {Carousel} from 'react-bootstrap'
import './banner-homepage-styles.css'

export const BannerHomepage = () => {

    return (
        <div className="carrousel-wraper">
            <Carousel 
                fade={true}
                interval={3000} 
                prevLabel={""}
                nextLabel={""}
            >
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://dam.ngenespanol.com/wp-content/uploads/2020/03/astronauta-cuarentena.jpg"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://media.metrolatam.com/2020/02/12/astronauta1640x3-af6a7406ee2c7c6b471604595fcac87b.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://fotos02.laopiniondemurcia.es/mmp/2020/03/27/690x278/astronauta.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

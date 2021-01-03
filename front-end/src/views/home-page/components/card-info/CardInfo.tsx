import {Card, Carousel} from 'react-bootstrap'
import AddShoppingCar from 'assets/icons/add-shopping-car.svg'
import Search from 'assets/icons/buscar.svg'
import Buy from 'assets/icons/bolsa-de-la-compra.svg'
import Orden from 'assets/icons/producto.svg'
import './card-info-styles.css'

const { Body } = Card;

export const CardInfo = () => {
    return (
            <Card className="info-item--card mt-3 mx-auto">
                <Body className="row" >

                    <div className="col-3">
                        <div className="info-item--wrapper">
                            <div className="info-item--step"> 1 </div>
                            <div className="info-item">
                                <div className="info-item--image">
                                    <img src={Search} alt="search icon" />
                                </div>
                                <span> Busca productos </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-3">
                        <div className="info-item--wrapper">
                            <div className="info-item--step"> 2 </div>
                            <div className="info-item">
                                <div className="info-item--image">
                                    <img src={AddShoppingCar} alt="shopping car" />
                                </div>
                                <span> Agrega al carrito </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-3">
                        <div className="info-item--wrapper">
                            <div className="info-item--step"> 3 </div>
                            <div className="info-item">
                                <div className="info-item--image">
                                <img src={Buy} alt="shopping car" />
                                </div>
                            <span> Concreta la compra </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-3">
                        <div className="info-item--wrapper">
                            <div className="info-item--step"> 4 </div>
                            <div className="info-item">
                                <div className="info-item--image">
                                <img src={Orden} alt="shopping car" />
                                </div>
                            <span> Recibe tus productos </span>
                            </div>
                        </div>
                    </div>
                    
                </Body>


                <div className="info-carousel">
                    <Carousel 
                        fade={true}
                        interval={1500} 
                        prevLabel={""}
                        nextLabel={""}
                        controls={false}
                        indicators={false}
                    >
                    <Carousel.Item>
                        <h5 className="text-center"> 1. Busca Productos </h5>
                    </Carousel.Item>
                    <Carousel.Item>
                        <h5 className="text-center"> 2. Agrega al carrito </h5>
                    </Carousel.Item>
                    <Carousel.Item>
                        <h5 className="text-center"> 3. Concreta la compra </h5>                    
                    </Carousel.Item>
                    <Carousel.Item>
                        <h5 className="text-center"> 4. Recibe tus productos </h5>                    
                    </Carousel.Item>
                    </Carousel>
                </div>
            </Card>
    )
}

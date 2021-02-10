import { imagesURL } from 'environments/base';
import { FC, useState } from 'react'
import './product-images-styles.css'

interface ProductImagesProps {
    readonly imagenes: Array<string> | null
}

// const imagenes = [
//     "https://www.banderasvdk.com/blog/wp-content/uploads/Bandera-Suiza.jpg",
//     "https://lh3.googleusercontent.com/proxy/3VT1RB1eZAvM8Opsz9ECNIMQQy6dDWsHOjDG8pqKbwmd2-dT64l8-k4uhKLiKrlNho8d4cozGSsyfy17XfxpNs-jcqnCPzK1y65t_kk57Wr9DjEpW7c",
//     "https://simages.ericdress.com/Upload/Image/2019/051/watermark/c4852529-36a5-45b9-aed4-cd4748f31d8d.jpg",
// ]

export const ProductImages: FC<ProductImagesProps> = ({ imagenes }) => {

    const [selected, setSelected] = useState<number>(0);

    return (
        <div className="row">
            <div className="col-2">
                <ul className="imagenes-lista">
                    {
                        imagenes && imagenes.map( (imagen, idx: number) =>
                            <li key={idx}>
                                <img src={ imagesURL + imagen} alt="" className={`imagen-producto--lista ${idx===selected && 'active'}`} onMouseEnter={() => setSelected(idx)} />
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="col-10">
                {
                    imagenes && 
                        <img src={ imagesURL + imagenes[selected]} alt="" className="imagen-producto--selected" />
                }
            </div>
        </div>
    )
}
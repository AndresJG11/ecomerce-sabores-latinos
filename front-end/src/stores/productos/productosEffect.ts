import { apiURL } from "environments/base";
import { ActualizarProducto } from "models/Products/ActualizarProducto";

export class ProductosEffect {

    static async requestObtenerProductos( idCategoria : number) {
    
        const response = await fetch(`${apiURL}/v1/producto/categoria/${idCategoria}`);

        const data = await response.json();
    
        return data

    }

    static async requestActualizarProducto( actualizarProducto : ActualizarProducto) {
    
        const response = await fetch(`${apiURL}/v1/producto`,
            {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( actualizarProducto ),
            }
        );

        // const data = await response.json();
    
        return response

    }
}

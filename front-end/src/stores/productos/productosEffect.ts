import { apiURL } from "environments/base";
import { ActualizarProducto } from "models/Products/ActualizarProducto";

export class ProductosEffect {

    static async requestObtenerProducto( idProducto : number) {
    
        const response = await fetch(`${apiURL}/v1/producto/${idProducto}`);

        const data = await response.json();
    
        return data

    }

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
    
        return response

    }

    static async requestAgregarProducto( agregarProducto : ActualizarProducto) {
    
        const response = await fetch(`${apiURL}/v1/producto`,
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( agregarProducto ),
            }
        );
    
        return response

    }

    static async requestEliminarProducto( idProducto : number ) {
    
        const response = await fetch(`${apiURL}/v1/producto/${idProducto}`,
            {
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                },
            }
        );
    
        return response

    }

    static async requestAgregarImagenProducto( {formData, idProducto} : {formData : FormData, idProducto : number} ) {
    
        const response = await fetch(`${apiURL}/v1/imagen/producto?idProducto=${idProducto}`,
            {
                method: 'POST',
                body: formData
            }
        );
    
        return response

    }

    static async requestEliminarImagenProducto( idImagen : number ) {
    
        const response = await fetch(`${apiURL}/v1/imagen/producto/${idImagen}`,
            {
                method: 'DELETE',
            }
        );
    
        return response

    }
}

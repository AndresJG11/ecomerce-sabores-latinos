import { apiURL } from "environments/base";
import { ActualizarProducto } from "models/Products/ActualizarProducto";

export class ProductosEffect {

    static async requestObtenerProducto( idProducto : number) {
    
        const response = await fetch(`${apiURL}/v1/producto/${idProducto}`);

        const data = await response.json();
    
        return data

    }

    static async requestObtenerProductos( {idCategoria, actualPage, pageSize}: {idCategoria : number, actualPage ? : number | null, pageSize ? : number | null}) {
    
        const response = await fetch(`${apiURL}/v1/producto/categoria/${idCategoria}?actualPage=${actualPage || null}&pageSize=${pageSize || null}`);

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

    static async requestAgregarImagenProducto( data : {imagenes : Array<string>, idProducto : number} ) {
    
        const response = await fetch(`${apiURL}/v1/imagen/producto`,
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( data ),
            }
        );
    
        return response

    }

    static async requestEliminarImagenProducto( {idImagen, idProducto}: {idImagen : number, idProducto : number} ) {
    
        const response = await fetch(`${apiURL}/v1/imagen/producto?idImagen=${idImagen}&idProducto=${idProducto}`,
            {
                method: 'DELETE',
            }
        );
    
        return response

    }
}

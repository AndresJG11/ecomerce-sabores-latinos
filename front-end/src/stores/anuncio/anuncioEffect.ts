import { apiURL } from "environments/base";

export default class AnuncioEffect {

    static async requestObtenerAnuncios() {

        const response = await fetch(`${apiURL}/v1/anuncio?actualPage=null&pageSize=null`);

        const data = await response.json();

        return data;

    }

    static async requestAgregarAnuncio({imagen, enlace, titulo } : {imagen: string, enlace : string, titulo : string}) {

        const response = await fetch(
            `${apiURL}/v1/anuncio`,
                {
                    method: 'POST',
                    body: JSON.stringify( {imagen, enlace, titulo } ),
                    headers:{ 
                        'Content-Type': 'application/json',
                    },
                }
            );

        return response;

    }

    static async requestEliminarAnuncio( id : number ) {

        const response = await fetch(
            `${apiURL}/v1/anuncio/${id}`,
                {
                    method: 'DELETE',
                }
            );

        return response;

    }

    static async requestActualizarAnuncio( data : { enlace : string, titulo : string, id : number, imagen : string} ) {

        const response = await fetch(
            `${apiURL}/v1/anuncio/${data.id}`,
                {
                    method: 'PUT',
                    body: JSON.stringify( data ),
                    headers:{ 
                        'Content-Type': 'application/json',
                    }
                }
            );

        return response;

    }

    static async requestActualizarImagenAnuncio( {formData, id} : {formData: FormData, id : number} ) {

        const response = await fetch(
            `${apiURL}/v1/anuncio/imagen/${id}`,
                {
                    method: 'PUT',
                    body: formData
                }
            );

        return response;

    }

}
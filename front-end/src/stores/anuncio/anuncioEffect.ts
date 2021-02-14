import { apiURL } from "environments/base";

export default class AnuncioEffect {

    static async requestObtenerAnuncios() {

        const response = await fetch(`${apiURL}/v1/anuncio?actualPage=null&pageSize=null`);

        const data = await response.json();

        return data;

    }

    static async requestAgregarAnuncio({formData, enlace, titulo } : {formData: FormData, enlace : string, titulo : string}) {

        const response = await fetch(
            `${apiURL}/v1/anuncio?enlace=${enlace}&titulo=${titulo}`,
                {
                    method: 'POST',
                    body: formData
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

    static async requestActualizarAnuncio( { enlace, titulo, id } : { enlace : string, titulo : string, id : number} ) {

        const response = await fetch(
            `${apiURL}/v1/anuncio/${id}?enlace=${enlace}&titulo=${titulo}`,
                {
                    method: 'PUT',
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
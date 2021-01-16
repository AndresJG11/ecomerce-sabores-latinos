import { apiURL } from "environments/base";

export default class CategoriasEffect {

    static async requestCategoriasHome() {

        const response = await fetch(`${apiURL}/v1/categoria/home`);

        const data = await response.json();

        return data;

    }

    static async requestCategoriasLista() {

        const response = await fetch(`${apiURL}/v1/categoria`);

        const data = await response.json();

        return data;

    }

    static async requestAgregarCategoria({formData, nombre}:{formData : FormData, nombre : string}) {

        const response = await fetch(
            `${apiURL}/v1/categoria?nombre=${nombre}`,
            {
                method: 'POST',
                body: formData
            }
            );

        return response;

    }

    static async requestActualizarCategoria({nombre, id} : {nombre : string, id : number}) {

        const response = await fetch(
            `${apiURL}/v1/categoria/${id}?nombre=${nombre}`,
            {
                method: 'PUT'
            }
        );

        return response;

    }

    static async requestActualizarImagenCategoria({formData, id}:{formData : FormData, id : number}) {

        const response = await fetch(
            `${apiURL}/v1/categoria/imagen/${id}`,
            {
                method: 'PUT',
                body: formData
            }
        );

        return response;
    }

    static async requestEliminarCategoria(id : number) {

        const response = await fetch(
            `${apiURL}/v1/categoria/${id}`,
            {
                method: 'delete',
                headers:{ 
                    'Content-Type': 'application/json',
                },
            }
            );

        const data = await response.json();

        return data;
        
    }
}
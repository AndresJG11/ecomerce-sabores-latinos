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

        // const data = await response.json();

        return response;

    }

    static async requestActualizarCategoria(formData : FormData) {

        const response = await fetch(
            `${apiURL}/v1/categoria`,
            {
                method: 'PUT',
                body: formData
            }
            );

        const data = await response.json();

        return data;

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
import { apiURL } from "environments/base";

export default class CategoriasEffect {

    static async requestCategoriasHome() {

        const response = await fetch(`${apiURL}/v1/categoria/home`);

        const data = await response.json();

        return data;

    }

    static async requestObtenerCategorias({actualPage, pageSize} : {actualPage : number | null, pageSize : number | null}) {

        const response = await fetch(`${apiURL}/v1/categoria?actualPage=${actualPage}&pageSize=${pageSize}`);

        const data = await response.json();

        return data;

    }

    static async requestAgregarCategoria(data:{icono : string, nombre : string}) {

        const response = await fetch(
            `${apiURL}/v1/categoria`,
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{ 
                        'Content-Type': 'application/json',
                    },
                }
            );

        return response;

    }

    static async requestActualizarCategoria(data : {nombre : string, icono: string, id : number}) {

        const response = await fetch(
            `${apiURL}/v1/categoria/${data.id}`,
                {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers:{ 
                        'Content-Type': 'application/json',
                    },
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

        return response;
        
    }
}
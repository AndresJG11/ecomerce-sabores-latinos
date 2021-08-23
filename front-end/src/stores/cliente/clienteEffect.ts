import { apiURL } from "environments/base";

export default class ClienteEffect {

    static async requestObtenerClientePorId({id}: {id: number}) {

        const response = await fetch(`${apiURL}/v1/cliente/${id}`,
            {
                method: 'POST'
            }
        );

        const data = await response.json();

        return data;

    }

}
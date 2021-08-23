import { apiURL } from "environments/base";

export default class VentaEffect {

    static async requestObtenerVentas({actualPage, estado, pageSize}:{actualPage: number, estado: number, pageSize: number}) {

        const response = await fetch(`${apiURL}/v1/venta?actualPage=${actualPage}&estado=${estado}&pageSize=${pageSize}`);

        const data = await response.json();

        return data;

    }

    static async requestCerrarVenta({idVenta} : {idVenta : number}) {

        const response = await fetch(
            `${apiURL}/v1/venta/cerrarventa?idVenta=${idVenta}`,
            {
                method: 'POST'
            }
        );

        return response;

    }

}
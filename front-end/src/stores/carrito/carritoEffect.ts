import { apiURL } from "environments/base";
import { DetallesVenta } from "models/Ventas/VentasTypes";

export default class CarritoEffect {

    static async requestAgregarVenta(detallesVenta: DetallesVenta) {

        const response = await fetch(`${apiURL}/v1/venta`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(detallesVenta)
            }
        );

        return response;

    }

}
import { apiURL } from "environments/base";
import { ActualizarSistema } from "models/System";

export class SistemaEffect {


    static async requestActualizarProducto( actualizarSistema : ActualizarSistema) {
    
        const response = await fetch(`${apiURL}/v1/sistema`,
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( actualizarSistema ),
            }
        );
    
        return response

    }
}

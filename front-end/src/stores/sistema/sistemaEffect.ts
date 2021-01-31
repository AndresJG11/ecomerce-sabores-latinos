import { apiURL } from "environments/base";
import { Sistema } from "models/System";

export class SistemaEffect {

    static async requestActualizarSistema( actualizarSistema : Sistema) {
    
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

    static async requestObtenerSistema( ) {
    
        const response = await fetch(`${apiURL}/v1/sistema`,
            {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                },
            }
        );
    
        const data = await response.json()

        return data
    }

}

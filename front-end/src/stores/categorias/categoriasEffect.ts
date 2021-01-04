import { apiURL } from "environments/base";

export default class CategoriasEffect {

    static async requestCategorias() {

        const response = await fetch( `${apiURL}/v1/home` );
        const data = await response.json();
  
        return data;

    }
  }
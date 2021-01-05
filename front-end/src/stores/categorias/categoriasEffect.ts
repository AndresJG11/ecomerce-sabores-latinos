import { apiURL } from "environments/base";

export default class CategoriasEffect {

    static async requestCategoriasHome() {

        const response = await fetch(`${apiURL}/v1/home`);

        const data = await response.json();

        return data;

    }

    static async requestCategoriasLista() {

        const response = await fetch(`${apiURL}/v1/categoria`);

        const data = await response.json();

        return data;

    }
}
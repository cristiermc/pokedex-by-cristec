
import type { Pokemon } from "../models/Pokemon.js";

export class BoxService {
    private catalogo: Pokemon[] = [];

    adicionar(pokemon: Pokemon): boolean {
        const jaExiste = this.catalogo.some (
            (item) => item.id === pokemon.id
        );

        if (jaExiste){
            return false;
        }

        this.catalogo.push(pokemon);

        return true;
    }

    listar(): Pokemon[]{
        return this.catalogo;
    }

    remover(id:number): boolean {
        const indice = this.catalogo.findIndex (
            (pokemon) => pokemon.id === id
        );

        if(indice === -1){
            return false;
        }

        this.catalogo.splice (indice, 1);
        return true;
    }
}
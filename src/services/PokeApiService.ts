
// Transformar resposta da API
import type { Pokemon } from "../models/Pokemon.js";

interface PokeApiPokemon {
    id: number,
    name: string,
    height: number,
    weight: number,
    types: {
        type: {
            name: string;
        }
    }[]
}
// Chamada à PokeAPI
export class PokeApiService {
    async buscarPokemon(nome: string): Promise<Pokemon> {
        const url = `https://pokeapi.co/api/v2/pokemon/${nome}`;
        const resposta = await fetch(url);
        if(!resposta.ok){
            throw new Error("Pokémon não encontrado");
            
        }
        
        const dados: PokeApiPokemon = await resposta.json()
        
        const pokemon: Pokemon = {
            id: dados.id,
            name: dados.name,
            types: dados.types.map((item) => item.type.name),
            height: dados.height,
            weight: dados.weight
        }
        return pokemon;
    }
}
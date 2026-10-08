
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
        };
    }[];
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
}
// Chamada à PokeAPI
export class PokeApiService {
    async buscarPokemon(nome: string): Promise<Pokemon> {
        const url = `https://pokeapi.co/api/v2/pokemon/${nome}`;
        const resposta = await fetch(url);
        if(!resposta.ok) {
            throw new Error("Pokémon não encontrado");
            
        }
        
        const dados: PokeApiPokemon = await resposta.json();
        
        const pokemon: Pokemon = {
            id: dados.id,
            name: dados.name,
            types: dados.types.map((item) => item.type.name),
            stats: {
                hp:dados.stats.find((item) => item.stat.name === "hp")?.base_stat ?? 0,
                attack:dados.stats.find((item) => item.stat.name === "attack")?.base_stat ?? 0,
                defense:dados.stats.find((item) => item.stat.name === "defense")?.base_stat ?? 0
            },
            height: dados.height,
            weight: dados.weight
        }
        return pokemon;
    }
}
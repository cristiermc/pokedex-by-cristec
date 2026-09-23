// Instanciar o PokeApiService
import { PokeApiService } from "./services/PokeApiService.js";
const pokeApiService = new PokeApiService();

try{
    const pokemon = await pokeApiService.buscarPokemon("pikachu");
    console.log(pokemon)
} catch (erro) {
    console.log(`[ERRO] ${erro}`)
}



// Instanciar o TerminalController
import { TerminalController } from "./controllers/TerminalController.js";

// Instanciar o PokeApiService
import { PokeApiService } from "./services/PokeApiService.js";

const pokeApiService = new PokeApiService();
const terminalController = new TerminalController();

try{
    const nome = await terminalController.solicitarPokemon();

    console.log(`Você informou: ${nome}`);

    const pokemon = await pokeApiService.buscarPokemon(nome);
    terminalController.exibirPokemon(pokemon);

} catch (erro) {
    if(erro instanceof Error){
        console.log(`[ERRO] ${erro.message}`)
    }
    
}



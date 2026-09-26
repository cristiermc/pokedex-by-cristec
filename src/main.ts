// Instanciar o TerminalController
import { TerminalController } from "./controllers/TerminalController.js";

// Instanciar o PokeApiService
import { PokeApiService } from "./services/PokeApiService.js";

// Instanciar o BoxService
import { BoxService } from "./services/BoxService.js";

const pokeApiService = new PokeApiService();
const terminalController = new TerminalController();
const boxService = new BoxService();

try{
    const pikachu = await pokeApiService.buscarPokemon("pikachu");

    const pikachuAdicionado = boxService.adicionar(pikachu);

    if (pikachuAdicionado) {
        console.log("[OK] Pikachu adicionado ao catálogo.");
    } else {
        console.log("[AVISO] Pikachu já está no catálogo.");
    }

    const charmander = await pokeApiService.buscarPokemon("charmander");

    const charmanderAdicionado = boxService.adicionar(charmander);

    if (charmanderAdicionado) {
        console.log("[OK] Charmander adicionado ao catálogo.");
    } else {
        console.log("[AVISO] Charmander já está no catálogo.");
    }

    const pikachuDuplicado = boxService.adicionar(pikachu);

    if (pikachuDuplicado) {
        console.log("[OK] Pikachu adicionado ao catálogo.");
    } else {
        console.log("[AVISO] Pikachu já está no catálogo.");
    }

    try {
        await pokeApiService.buscarPokemon("pokemon-inexistente");
    } catch (erro) {
        if (erro instanceof Error) {
            console.log(`[ERRO] ${erro.message}`);
        }
    }

    console.log("\nPokémon no catálogo: ");
    

    const catalogo = boxService.listar();

    for (const item of catalogo) {
        terminalController.exibirPokemon(item);
    }

    const removido = boxService.remover(25);

    if (removido) {
        console.log("[OK] Pokémon removido do catálogo.");
    } else {
        console.log("[AVISO] Pokémon não encontrado no catálogo.")
    }

    console.log("\nCatálogo após remoção: ");

    const catalogoDepoisDaRemocao = boxService.listar();

    for (const item of catalogoDepoisDaRemocao) {
        terminalController.exibirPokemon(item);
    }


} catch (erro) {
    if(erro instanceof Error){
        console.log(`[ERRO] ${erro.message}`)
    }
    
}



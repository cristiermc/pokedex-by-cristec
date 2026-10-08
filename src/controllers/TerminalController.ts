import { PokeApiService } from "../services/PokeApiService.js";
import { BoxService } from "../services/BoxService.js";

import type { Pokemon } from "../models/Pokemon.js";

export class TerminalController {

    constructor(
        private readonly pokeApiService: PokeApiService,
        private readonly boxService: BoxService
    ) {}

    async executar(): Promise<void> {

        try {

            const pikachu = await this.pokeApiService.buscarPokemon("pikachu");

            const pikachuAdicionado =
                await this.boxService.adicionar(pikachu);

            if (pikachuAdicionado) {
                console.log("[OK] Pikachu adicionado ao catálogo.");
            } else {
                console.log("[AVISO] Pikachu já está no catálogo.");
            }

            const charmander =
                await this.pokeApiService.buscarPokemon("charmander");

            const charmanderAdicionado =
                await this.boxService.adicionar(charmander);

            if (charmanderAdicionado) {
                console.log("[OK] Charmander adicionado ao catálogo.");
            } else {
                console.log("[AVISO] Charmander já está no catálogo.");
            }

            const pikachuDuplicado =
                await this.boxService.adicionar(pikachu);

            if (pikachuDuplicado) {
                console.log("[OK] Pikachu adicionado ao catálogo.");
            } else {
                console.log("[AVISO] Pikachu já está no catálogo.");
            }

            try {

                await this.pokeApiService.buscarPokemon("pokemon-inexistente");

            } catch (erro) {

                if (erro instanceof Error) {
                    console.log(`[ERRO] ${erro.message}`);
                }
            }

            console.log("\nPokémon no catálogo:");

            const catalogo = this.boxService.listar();

            catalogo.forEach((pokemon) => {
                this.exibirPokemon(pokemon);
            });

            const removido = await this.boxService.remover(25);

            if (removido) {
                console.log("[OK] Pokémon removido do catálogo.");
            } else {
                console.log("[AVISO] Pokémon não encontrado no catálogo.");
            }

            console.log("\nCatálogo após remoção:");

            const catalogoDepoisDaRemocao = this.boxService.listar();

            catalogoDepoisDaRemocao.forEach((pokemon) => {
                this.exibirPokemon(pokemon);
            });

        } catch (erro) {

            if (erro instanceof Error) {
                console.log(`[ERRO] ${erro.message}`);
            }
        }
    }

    exibirPokemon(pokemon: Pokemon): void {

        console.log(
            `#${pokemon.id} - ${pokemon.name} | ` +
            `Tipos: ${pokemon.types.join(", ")} | ` +
            `HP: ${pokemon.stats.hp} | ` +
            `Attack: ${pokemon.stats.attack} | ` +
            `Defense: ${pokemon.stats.defense} | ` +
            `Altura: ${pokemon.height} | ` +
            `Peso: ${pokemon.weight}`
        );
    }
}
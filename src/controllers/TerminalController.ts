// Receber a entrada do cliente

import { createInterface } from "node:readline/promises";

import {stdin as input, stdout as output } from "node:process";

import type { Pokemon } from "../models/Pokemon.js";

export class TerminalController {
    async solicitarPokemon(): Promise<string> {
        const terminal = createInterface({
            input,
            output
        });

        const nome = await terminal.question("Digite o nome do Pokémon: ");

        terminal.close();

        return nome;
    }

    exibirPokemon(pokemon: Pokemon): void {
        console.log(
            `#${pokemon.id} - ${pokemon.name} | Tipos: ${pokemon.types.join(", ")} | Altura: ${pokemon.height} | Peso: ${pokemon.weight}`
        );
        
    }
}
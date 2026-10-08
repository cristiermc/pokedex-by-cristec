import { access, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import type { Pokemon } from "../models/Pokemon.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const caminhoArquivo = join(__dirname, "../../pc_box.json");

export class BoxService {

    private catalogo: Pokemon[] = [];

    async inicializar(): Promise<void> {

        try {
            await access(caminhoArquivo);
        } catch {
            await writeFile(caminhoArquivo, "[]", "utf-8");
        }

        const conteudo = await readFile(caminhoArquivo, "utf-8");

        this.catalogo = JSON.parse(conteudo) as Pokemon[];
    }

    async adicionar(pokemon: Pokemon): Promise<boolean> {

        const jaExiste = this.catalogo.some(
            (item) => item.id === pokemon.id
        );

        if (jaExiste) {
            return false;
        }

        this.catalogo.push(pokemon);

        await this.salvar();

        return true;
    }

    listar(): Pokemon[] {
        return this.catalogo;
    }

    async remover(id: number): Promise<boolean> {

        const indice = this.catalogo.findIndex(
            (pokemon) => pokemon.id === id
        );

        if (indice === -1) {
            return false;
        }

        this.catalogo.splice(indice, 1);

        await this.salvar();

        return true;
    }

    private async salvar(): Promise<void> {

        const conteudo = JSON.stringify(this.catalogo, null, 2);

        await writeFile(caminhoArquivo, conteudo, "utf-8");
    }
}
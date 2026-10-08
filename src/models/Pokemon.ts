// Definir o modelo Pokemon

export interface Pokemon {
    id: number;
    name: string;
    types: string[];
    stats: {
        hp: number;
        attack: number;
        defense: number;
    };
    height: number;
    weight: number;
}
// Definir o modelo Pokemon

export interface Pokemon {
    id: number;
    name: string;
    types: string[];
    height: number;
    weight: number;
}
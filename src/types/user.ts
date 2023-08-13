export interface IPokemon {
    id: number;
    name: string;
    stats: Stats[];
    weight: number;
    moves: []
    sprites: {
        front_default: string
    }
    types: Type[]

}

export interface Type {
    type: {
        name: string
    }
}

interface Stats {
    base_stat: number,
    stat: {
        name: string,
    }
}

export type Pokemons = IPokemon[];
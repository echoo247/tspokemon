import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {IPokemon, Pokemons} from "../types";

interface PrePokemon {
    name: string,
    url: string
}

export const fetchPokemon = createAsyncThunk<
    Pokemons,
    {offset: number, limit: number},
    {
        rejectValue: string
    }
    >(
    'pokemon/fetchPokemon',
    async function({offset, limit}, {rejectWithValue}) {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon`,
                { params: { offset, limit } }
            );

            const res = await Promise.all(
                response.data.results?.map( async (item: PrePokemon) => {
                    const axiosResponse =await axios.get(item.url)
                    return axiosResponse.data
                })
            )
            return res
        } catch (error) {
            return rejectWithValue(error as any)
        }
    },
)


type FilterPokemon = {
    pokemon: IPokemon[],
    filteredPokemon: IPokemon[],
    isLoading: boolean,
    error: string | null | undefined,
    limit: number,
    offset: number,
    pokemonDetail: IPokemon | null,
    selectedType: string | null
}

const initialState: FilterPokemon = {
    pokemon: [],
    filteredPokemon: [],
    isLoading: false,
    error: null,
    limit: 12,
    offset: 0,
    pokemonDetail: null,
    selectedType: null
};


const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        getPokemon(state, action) {
            state.pokemonDetail = action.payload
        },
        loadMore(state, action) {
            state.offset = state.offset + action.payload.offset
            if(action.payload.limit)
                state.limit = state.limit + action.payload.limit
        },
        closeDetail(state) {
            state.pokemonDetail = null
        },
        filterPokemon(state, action) {
            state.selectedType = action.payload
            if(action.payload === 'all') {
                state.filteredPokemon = state.pokemon
                return;
            }
            state.filteredPokemon = state.pokemon.filter(value => value.types[0].type.name === action.payload.toLowerCase())
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPokemon.pending, (state) => {
            state.error = null
            state.isLoading = true
        })
        builder.addCase(fetchPokemon.fulfilled, (state, action) => {
            state.pokemon = [...state.pokemon, ...action.payload]
            state.filteredPokemon = [...state.filteredPokemon, ...action.payload]
            state.isLoading = false
            state.error = null
        })
        builder.addCase(fetchPokemon.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    },
});


export const {getPokemon, loadMore, closeDetail, filterPokemon} = pokemonSlice.actions

export const pokemonReducer = pokemonSlice.reducer
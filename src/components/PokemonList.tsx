import React from 'react';
import style from './pokemon-list.module.css'
import {PokemonItem} from "./PokemonItem";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {getPokemon, loadMore} from '../features/pocemonSlice'
import {isEqual} from "lodash";
import {IPokemon} from "../types";

export const PokemonList = () => {
    const {filteredPokemon, pokemonDetail} = useAppSelector(state => state.pokemon)
    const dispatch = useAppDispatch()

    const handleLoad = () => {
      dispatch(loadMore({offset: 12}))
    }

    const handleInfo = (item: IPokemon) => {
        const checkPokemon = isEqual(pokemonDetail, item)
        if(checkPokemon){
            return dispatch(getPokemon(null))
        }
        return dispatch(getPokemon(item))
    }

    return (
        <main className={!pokemonDetail ? style.main : style.main_info}>
            <ul className={style.pokemon_list}>
                {filteredPokemon.map((item) =>
                    <li key={item.id} onClick={() => handleInfo(item)} className={style.pokemon}>
                        <PokemonItem img={item.sprites.front_default} name={item.name} types={item.types} />
                    </li>
                )}
            </ul>

            <button onClick={handleLoad} className={style.load_more_button}>Load More</button>
        </main>
    );
};



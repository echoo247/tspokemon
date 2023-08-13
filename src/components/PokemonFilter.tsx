import React, {useEffect, useState} from 'react';
import style from './pokemon-filter.module.css'
import {colorTypes} from "../utils";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {filterPokemon, loadMore} from "../features/pocemonSlice";

export const PokemonFilter = () => {
    const types = ['Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic',
        'Rock', 'Ground', 'Fighting', 'Flying', 'Poison', 'Bug',
        'Ghost', 'Steel', 'Ice', 'Dragon', 'Dark', 'Fairy'];
    const [fetchTrue, setFetchTrue] = useState<boolean>(true)
    const [type, setType] = useState<string>('');
    const {selectedType, pokemon, limit, filteredPokemon} = useAppSelector(state => state.pokemon)
    const dispatch = useAppDispatch()


    const handleTypeChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (pokemon.length < 998 && fetchTrue){
            dispatch(loadMore({limit: 999 - limit, offset: 12}))
            setFetchTrue(false)
        }
        setType(event.target.value)
    }


    useEffect(() => {
        if(type) {
            dispatch(filterPokemon(type))
        }
    }, [filteredPokemon.length, type])


    return (
        <div>
            <label className={style.label}>Filter by Type:</label>
            {/*@ts-ignore*/}
            <select style={{backgroundColor: colorTypes[`${selectedType?.toLowerCase()}`]}} className={style.select} value={selectedType ? selectedType: 'all'} onChange={event => handleTypeChange(event)}>
                <option style={{backgroundColor: '#44685E'}} value="all">All</option>
                {types.map((type) => (
                    // @ts-ignore
                    <option style={{backgroundColor: colorTypes[`${type.toLowerCase()}`]}} key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    );
};


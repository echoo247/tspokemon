import React from 'react';
import style from './pokemon-info.module.css'
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {closeDetail} from "../features/pocemonSlice";


export const PokemonInfo = () => {
    const {pokemonDetail} = useAppSelector(state => state.pokemon)
    const dispatch = useAppDispatch()


    const handleClose = () => {
        dispatch(closeDetail())
    }

    return (
        <div onClick={() => handleClose()} className={style.detail_container}>
            <div className={style.pokemon_card}>
                <img src={pokemonDetail?.sprites.front_default} alt={pokemonDetail?.name} className={style.pokemon_image}/>
                <div className={style.pokemon_details}>
                    <h3 className={style.pokemon_name}>{pokemonDetail?.name} <i><b>#</b></i>{pokemonDetail?.id}</h3>
                    <table className={style.details_table}>
                        <tbody>
                        <tr>
                            <th>Type</th>
                            <td>{pokemonDetail?.types[0].type.name}</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <th>Attack</th>
                            <td>{pokemonDetail?.stats[0].base_stat
                            }</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <th>Defence</th>
                            <td>{pokemonDetail?.stats[1].base_stat
                            }</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <th>HP</th>
                            <td>{pokemonDetail?.stats[2].base_stat
                            }</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <th>SP Attack</th>
                            <td>{pokemonDetail?.stats[3].base_stat
                            }</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <th>SP Defence</th>
                            <td>{pokemonDetail?.stats[4].base_stat
                            }</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <th>Speed</th>
                            <td>{pokemonDetail?.stats[5].base_stat
                            }</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <th>Weight</th>
                            <td>{pokemonDetail?.weight}</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <th>Total moves</th>
                            <td>{pokemonDetail?.moves.length}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


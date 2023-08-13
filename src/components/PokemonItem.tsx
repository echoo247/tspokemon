import React, {FC} from 'react';
import style from "./pokemon-item.module.css";
import {colorTypes} from "../utils";
import {Type} from "../types";



interface IItemPoke {
    img: string
    name: string,
    types: Type[],
}

export const PokemonItem: FC<IItemPoke> = (props) => {

    return (
        <>
            <img src={props.img} alt={"pokemon"}/>
            <div className={style.pokemon_name}>{props.name}</div>
            <ul className={style.pokemon_types}>
                {props.types.map((type, index) =>
                    // @ts-ignore
                    <li key={index} style={{backgroundColor: colorTypes[`${type.type.name}`]}} className={style.type}>{type.type.name}</li>
                )}
            </ul>
        </>
    );
};


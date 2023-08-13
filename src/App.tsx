import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {fetchPokemon, loadMore} from "./features/pocemonSlice";
import {PokemonList} from "./components/PokemonList";
import {PokemonInfo} from "./components/PokemonInfo";
import {PokemonFilter} from "./components/PokemonFilter";

function App() {
  const dispatch = useAppDispatch();
  const {limit, offset, isLoading, error, pokemonDetail, filteredPokemon, selectedType, pokemon} = useAppSelector(state => state.pokemon)

  useEffect(() => {
      if (pokemon.length < 998)
          dispatch(fetchPokemon({limit, offset}))
  }, [dispatch, limit, offset])

  return (
      <div className="container">
        <div className='header'>
          <h1>Pokedex</h1>
        </div>
          <PokemonFilter/>
          {error && <h1>Error ${error}</h1>}
          <div className={pokemonDetail ? "update_wrapper" : ''}>
              {isLoading ? <h1>Loading...</h1> : filteredPokemon.length > 0 ?
                  <PokemonList/>
                  : <h1>Not found {selectedType}</h1>
              }
          </div>
          {pokemonDetail && <PokemonInfo/>}
      </div>
  );
}

export default App;

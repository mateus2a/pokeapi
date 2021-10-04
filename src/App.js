import React, { useState } from 'react';
import api from './services/pokeapi';
const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [typedPokemon, setTypedPokemon] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setTypedPokemon(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!typedPokemon) return;

    setIsLoading(true);

    try {
      const res = await api.get(`/pokemon/${typedPokemon}`);
      setPokemon(res.data);
      setError(null);
      setIsLoading(false);
    } catch (error) {
      setError('Pokemon not found!');
      setIsLoading(false);
      setPokemon(null);
    }
  };
  return (
    <div>
      <h1>Welcome to pokedex</h1>
      <p>Enter a name of a pokemon</p>
      <form onSubmit={handleSubmit}>
        <input
          value={typedPokemon}
          placeholder="Name/id of the pokemon"
          onChange={handleChange}
        />
        <button type="submit">
          {isLoading ? <span>carregando...</span> : <>Search</>}
        </button>
      </form>
      {error && <span>{error}</span>}
      {pokemon && (
        <div key={pokemon.id}>
          {isLoading ? (
            <span>carregando...</span>
          ) : (
            <>
              <div>
                <h2>{pokemon.name}</h2>
                <img
                  src={pokemon.sprites['front_default']}
                  alt={pokemon.name}
                />
              </div>
              <div>
                <span>
                  <strong>Height</strong>: {pokemon.height * 10} cm
                </span>
                <span>
                  <strong>Weight</strong>: {pokemon.weight / 10} kg
                </span>
                <span>
                  <strong>Type</strong>: {pokemon.types[0].type.name}
                </span>
                <span>
                  <strong>id</strong>: {pokemon.id}
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;

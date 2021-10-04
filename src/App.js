import React, { useState } from 'react';
import api from './services/pokeapi';
import pokeball from './assets/pokeball.svg';
import './App.css';

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
    <div className="container">
      <div className="search">
        <h1>Seja bem vindo à Pokedex</h1>
        <p>Digite o nome ou id do pokemon para começar</p>
        <form onSubmit={handleSubmit}>
          <input
            value={typedPokemon}
            placeholder="Digite o nome ou id do pokemon"
            onChange={handleChange}
          />
          <button type="submit">
            {!isLoading ? (
              <>
                <span>Buscar</span>
                <img class="pokeball" alt="pokeball img" src={pokeball} />
              </>
            ) : (
              <span>carregando...</span>
            )}
          </button>
        </form>
      </div>
      {error && <span>{error}</span>}
      {pokemon && (
        <div className="pokemon-container" key={pokemon.id}>
          <div className="pokemon">
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
                    <strong>Height</strong>: {pokemon.height * 10}cm
                  </span>
                  <span>
                    <strong>Weight</strong>: {pokemon.weight / 10}kg
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
        </div>
      )}
    </div>
  );
};

export default App;

"use client";

import { useState } from "react";
import usePokemonApi from "../hooks/usePokemonApi";

export default function Home() {
  const {
    data,
    error,
    fetchAllPokemons,
    fetchPokemonById,
    fetchPokemonAndTypes,
  } = usePokemonApi();

  const [pokemonId, setPokemonId] = useState("");
  const [pokemonTypesId, setPokemonTypesId] = useState("");
  const [inputError, setInputError] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value === "" || /^([1-9]|[1-9][0-9]|100)$/.test(value)) {
      setPokemonId(value);
    }
  };

  const handleInputChangeType = (event) => {
    const value = event.target.value;
    if (value === "" || /^([1-9]|[1-9][0-9]|100)$/.test(value)) {
      setPokemonTypesId(value);
    }
  };

  const handleFetchPokemons = () => {
    setInputError("");
    fetchAllPokemons();
  };

  const handleFetchPokemonById = () => {
    if (!pokemonId) {
      setInputError("Please enter a Pokémon ID first");
    } else {
      setInputError("");
      fetchPokemonById(pokemonId);
    }
  };

  const handleFetchPokemonAndTypes = () => {
    if (!pokemonTypesId) {
      setInputError("Please enter a Pokémon ID first");
    } else {
      setInputError("");
      fetchPokemonAndTypes(pokemonTypesId);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1>Pokémon API</h1>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 40,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              disabled
              type="text"
              placeholder="100"
              style={{
                width: "240px",
                height: "50px",
                textAlign: "center",
                marginBottom: "10px",
              }}
            />
            <button onClick={handleFetchPokemons}>Get All Pokémon</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="text"
              value={pokemonId}
              onChange={handleInputChange}
              min="1"
              max="100"
              style={{
                width: "240px",
                height: "50px",
                textAlign: "center",
                marginBottom: "10px",
              }}
            />
            <button onClick={handleFetchPokemonById}>
              {pokemonId === "" ? "Input Pokémon ID" : "Get Pokémon by ID"}
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="text"
              value={pokemonTypesId}
              onChange={handleInputChangeType}
              min="1"
              max="100"
              style={{
                width: "240px",
                height: "50px",
                textAlign: "center",
                marginBottom: "10px",
              }}
            />
            <button onClick={handleFetchPokemonAndTypes}>
              {pokemonTypesId === ""
                ? "Input Pokémon ID"
                : "Get Pokémon and Types"}
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
          padding: "10px",
          width: "800px",
          height: "600px",
          overflowY: "auto",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      >
        {inputError && <p style={{ color: "red" }}>{inputError}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {data && !inputError && (
          <pre style={{ whiteSpace: "pre-wrap", margin: 0, padding: '10px' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}

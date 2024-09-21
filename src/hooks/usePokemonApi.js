import { useState } from "react";
import axios from "axios";

// const API_URL = "https://pokeapi-production-785b.up.railway.app/api/pokemon";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const usePokemonApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchAllPokemons = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching all Pokemons");
      setData(null);
    }
  };

  const fetchPokemonById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching Pokemon by ID");
      setData(null);
    }
  };

  const fetchPokemonAndTypes = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/types/${id}`);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching Pokemon and types");
      setData(null);
    }
  };

  return {
    data,
    error,
    fetchAllPokemons,
    fetchPokemonById,
    fetchPokemonAndTypes,
  };
};

export default usePokemonApi;

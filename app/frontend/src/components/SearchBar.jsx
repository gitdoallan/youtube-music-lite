import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import fetchApi from '../services/api';
import { setSearchResults } from '../redux/slicers/searchResults';
import { setLoadingResults } from '../redux/slicers/loading';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoadingResults(true));
    try {
      const apiResponse = await fetchApi(search);
      dispatch(setSearchResults(apiResponse));
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoadingResults(false));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">
        <input
          id="search"
          type="text"
          value={search}
          placeholder="Busque por um artista, música ou álbum"
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      <button type="submit">Buscar</button>
    </form>
  );
}

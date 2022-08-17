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
      <label htmlFor="search-input">
        <input
          id="search-input"
          data-testid="search-input"
          type="text"
          value={search}
          placeholder="Search for an artist, album or song"
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}

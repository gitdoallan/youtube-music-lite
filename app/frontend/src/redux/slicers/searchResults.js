import { createSlice } from '@reduxjs/toolkit';

export const searchResults = createSlice({
  name: 'searchResults',
  initialState: [],
  reducers: {
    setSearchResults: (_state, { payload }) => payload,
  },
});

export const { setSearchResults } = searchResults.actions;

import { configureStore } from '@reduxjs/toolkit';
import { currentSong } from './slicers/currentSong';
import { loading } from './slicers/loading';
import { searchResults } from './slicers/searchResults';

const store = configureStore({
  reducer: {
    currentSong: currentSong.reducer,
    loadingResults: loading.reducer,
    searchResults: searchResults.reducer,
  },
});

export default store;

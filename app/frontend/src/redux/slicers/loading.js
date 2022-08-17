import { createSlice } from '@reduxjs/toolkit';

export const loading = createSlice({
  name: 'loadingResults',
  initialState: false,
  reducers: {
    setLoadingResults: (_state, { payload }) => payload,
  },
});

export const { setLoadingResults } = loading.actions;

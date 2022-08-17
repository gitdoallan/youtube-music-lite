import { createSlice } from '@reduxjs/toolkit';

export const currentSong = createSlice({
  name: 'currentSong',
  initialState: '',
  reducers: {
    setCurrentSong: (_state, { payload }) => payload,
  },
});

export const { setCurrentSong } = currentSong.actions;

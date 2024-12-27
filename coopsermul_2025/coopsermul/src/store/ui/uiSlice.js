import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isCandidatoSelected: false,
  },
  reducers: {
    onSelectCandidato: (state) => {
      state.isCandidatoSelected = true;
    },
    onDeSelectCandidato: (state) => {
      state.isCandidatoSelected = false;
    },
  },
});

export const { onSelectCandidato, onDeSelectCandidato } = uiSlice.actions;

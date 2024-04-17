import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Coin } from "../types/types";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    coins: [] as Coin[],
  },

  reducers: {
    addFavorite: (state, action: PayloadAction<Coin>) => {
      state.coins.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.coins.splice(state.coins.indexOf(action.payload.id), 1);
    },
  },
});

export const addFavorite = favoritesSlice.actions.addFavorite;
export const removeFavorite = favoritesSlice.actions.removeFavorite;
export const favoritesReducer = favoritesSlice.reducer;

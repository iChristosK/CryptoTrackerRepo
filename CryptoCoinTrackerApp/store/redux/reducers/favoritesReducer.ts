import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Coin } from "../../../types/Coin";

interface FavoritesState {
  favoriteCoins: Coin[];
}

const initialState: FavoritesState = {
  favoriteCoins: [] as Coin[],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    markFavorite(state, action: PayloadAction<Coin>) {
      const newFavoritesCoins = [...state.favoriteCoins];
      const favoriteCoins = newFavoritesCoins.filter(
        (coin) => coin !== action.payload,
      );
      state.favoriteCoins = favoriteCoins;
    },
    unmarkFavorite(state, action: PayloadAction<string>) {
      const favoriteCoins = state.favoriteCoins;
      const filteredFavoriteCoins = favoriteCoins.filter(
        (coin) => coin.id !== action.payload,
      );
      state.favoriteCoins = filteredFavoriteCoins;
    },
  },
});

export const { markFavorite, unmarkFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;

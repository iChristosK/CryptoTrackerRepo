import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchCoinsData } from "../actions/coinsActions";
import { Coin } from "../types/types";

interface CoinsState {
  coins: Coin[];
  loading: boolean;
  error: string | null;
}

const initialState: CoinsState = {
  coins: [],
  loading: false,
  error: null,
};

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCoinsData.fulfilled,
        (state, action: PayloadAction<Coin[]>) => {
          state.loading = false;
          state.coins = action.payload;
        },
      )
      .addCase(fetchCoinsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export const coinsReducer = coinsSlice.reducer;

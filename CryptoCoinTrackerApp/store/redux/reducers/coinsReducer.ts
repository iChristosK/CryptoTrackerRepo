import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Coin, MarketData } from "../../../types/Coin";
import { Pagination } from "../../../types/Pagination";
import { fetchCoins } from "../actions/coinsActions";

interface CoinsState {
  coin: Coin | null;
  coins: Coin[] | null;
  loading: boolean;
  error: string | null;
  coinChartData: [number, number][] | null;
  chartLoading: boolean;
  chartError: string | null;
  coinDetailedData: MarketData | null;
  detailedLoading: boolean;
  detailedError: string | null;
  pagination: Pagination;
}

const initialState: CoinsState = {
  coin: null,
  coins: null,
  loading: false,
  error: null,
  coinChartData: null,
  chartLoading: false,
  chartError: null,
  coinDetailedData: null,
  detailedLoading: false,
  detailedError: null,
  pagination: {
    page: 1,
    coinsPerPage: 100,
  },
};

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    resetCoins(state) {
      state.coins = [];
    },
    resetCoinMarketChart(state) {
      state.coinChartData = null;
    },
    resetCoinDetailedData(state) {
      state.coinDetailedData = null;
    },
    setPagination(state, action: PayloadAction<Pagination>) {
      state.pagination = action.payload;
    },
    selectCoin(state, action: PayloadAction<Coin>) {
      state.coin = action.payload;
    },
    fetchCoinDetailedDataRequest(state) {
      state.detailedLoading = true;
      state.detailedError = null;
    },
    fetchCoinDetailedDataRequestSuccess(
      state,
      action: PayloadAction<MarketData>,
    ) {
      state.coinDetailedData = action.payload;
      state.detailedLoading = false;
      state.detailedError = null;
    },
    fetchCoinDetailedDataRequestFailure(state, action: PayloadAction<string>) {
      state.detailedError = action.payload;
      state.detailedLoading = false;
    },
    fetchCoinMarketDataRequest(state) {
      state.chartLoading = true;
      state.chartError = null;
    },
    fetchCoinMarketDataRequestSuccess(
      state,
      action: PayloadAction<[number, number][]>,
    ) {
      state.coinChartData = action.payload;
      state.chartLoading = false;
      state.chartError = null;
    },
    fetchCoinMarketDataRequestFailure(state, action: PayloadAction<string>) {
      state.chartError = action.payload;
      state.chartLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    /**
     * 
        * Separation of Concerns: It allows you to separate the handling of actions that originate from outside the slice, such as async thunk actions created with createAsyncThunk, from the actions defined within the slice.

        Centralized Logic: By centralizing the logic for handling additional actions in one place (extraReducers), you avoid scattering the logic across different parts of your codebase, making it easier to manage and maintain.

        Avoiding Mutation: Redux Toolkit's createSlice uses Immer internally to enable writing immutable updates to state. extraReducers works seamlessly with Immer, ensuring that state updates are still immutable even when handling actions outside of the slice.

        Type Safety: The builder function provides type checking for action types, ensuring that you handle each action type correctly and avoid typos or missing cases.
     */
  },
});

export const {
  resetCoins,
  resetCoinMarketChart,
  resetCoinDetailedData,
  setPagination,
  selectCoin,
  fetchCoinDetailedDataRequest,
  fetchCoinDetailedDataRequestSuccess,
  fetchCoinDetailedDataRequestFailure,
  fetchCoinMarketDataRequest,
  fetchCoinMarketDataRequestSuccess,
  fetchCoinMarketDataRequestFailure,
} = coinsSlice.actions;

export const coinsReducer = coinsSlice.reducer;

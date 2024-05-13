import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Coin, MarketData } from "../../../types/Coin";
import { Pagination } from "../../../types/Pagination";

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
    fetchCoinsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCoinsRequestSuccess(state, action: PayloadAction<Coin[]>) {
      const newCoins = action.payload.filter(
        (coin) => !state.coins?.includes(coin),
      );
      state.coins = state.coins ? [...state.coins, ...newCoins] : newCoins;
      state.loading = false;
      state.error = null;
    },
    fetchCoinsRequestFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
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
});

export const {
  resetCoins,
  resetCoinMarketChart,
  resetCoinDetailedData,
  setPagination,
  selectCoin,
  fetchCoinsRequest,
  fetchCoinsRequestSuccess,
  fetchCoinsRequestFailure,
  fetchCoinDetailedDataRequest,
  fetchCoinDetailedDataRequestSuccess,
  fetchCoinDetailedDataRequestFailure,
  fetchCoinMarketDataRequest,
  fetchCoinMarketDataRequestSuccess,
  fetchCoinMarketDataRequestFailure,
} = coinsSlice.actions;

export const coinsReducer = coinsSlice.reducer;

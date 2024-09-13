import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  API_BASE_URL,
  CURRENCY_USD,
  LOCALE_EN,
  MARKETS_ENDPOINT,
  MARKET_CAP_ORDER,
  PRICE_CHANGE_PERCENTAGE_7D,
  QUERY_PRECISION,
  SUCCESS_STATUS_REQUEST_CODE,
} from "../../../constants/Constants";

export const fetchCoins = createAsyncThunk(
  "coins/fetchCoins",
  async (
    {
      currentPage = 1,
      coinsPerPage,
      searchTerm,
    }: { currentPage: number; coinsPerPage: number; searchTerm: string },
    { rejectWithValue },
  ) => {
    try {
      const queryParams = `?vs_currency=${CURRENCY_USD}&ids=${searchTerm}&page=${currentPage}&per_page=${coinsPerPage}&order=${MARKET_CAP_ORDER}&sparkline=${false}&locale=${LOCALE_EN}&price_change_percentage=${PRICE_CHANGE_PERCENTAGE_7D}&precision=${QUERY_PRECISION}`;
      const coinsMarketsURL = `${API_BASE_URL}${MARKETS_ENDPOINT}${queryParams}`;
      const response = await axios.get(coinsMarketsURL);

      if (response.status === SUCCESS_STATUS_REQUEST_CODE && response.data) {
        return response.data;
      } else {
        return rejectWithValue("Failed to fetch coins");
      }
    } catch (error) {
      return rejectWithValue(error?.toString());
    }
  },
);

// FULL URL => https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily&precision=2

export const fetchMarketChartByCoinID = createAsyncThunk(
  "coins/fetchMarketChartByCoinID",
  async (coinID: string, { rejectWithValue }) => {
    try {
      const queryParams = `/market_chart?vs_currency=usd&days=30&interval=daily&precision=2`;
      const coinIdURL = `${API_BASE_URL}${coinID}${queryParams}`;
      const response = await axios.get(coinIdURL);
      if (response.status === SUCCESS_STATUS_REQUEST_CODE && response.data) {
        const data = response.data;
        const prices = data.prices;
        return prices;
      } else {
        return rejectWithValue("Failed to fetch market chart coin");
      }
    } catch (error) {
      return rejectWithValue(error?.toString());
    }
  },
);

// FULL URL => https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false

export const fetchCoinDetailedData = createAsyncThunk(
  "coins/fetchCoinDetailedData",
  async (coinID: string, { rejectWithValue }) => {
    const queryParams = `?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    const coinIdURL = `${API_BASE_URL}${coinID}${queryParams}`;
    try {
      const response = await axios.get(coinIdURL);
      if (response.status === SUCCESS_STATUS_REQUEST_CODE && response.data) {
        const data = response.data;
        const marketData = data.market_data;
        return marketData;
      } else {
        return rejectWithValue("Failed to fetch market chart coin");
      }
    } catch (error) {
      return rejectWithValue(error?.toString());
    }
  },
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Dispatch } from "redux";

import {
  FETCH_COINS_REQUEST,
  FETCH_COINS_REQUEST_FAILURE,
  FETCH_COINS_REQUEST_SUCCESS,
  FETCH_COIN_DETAILED_DATA,
  FETCH_COIN_DETAILED_DATA_FAILURE,
  FETCH_COIN_DETAILED_DATA_SUCCESS,
  FETCH_COIN_MARKET_CHART_REQUEST,
  FETCH_COIN_MARKET_CHART_REQUEST_FAILURE,
  FETCH_COIN_MARKET_CHART_REQUEST_SUCCESS,
  RESET_COINS,
  RESET_COIN_DETAILED_DATA,
  RESET_COIN_MARKET_CHART,
  SELECT_COIN,
  SET_PAGINATION,
} from "./types/types";
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
import { Coin } from "../../../types/Coin";
import { Pagination } from "../../../types/Pagination";

export const setPagination =
  (pagination: Pagination) => (dispatch: Dispatch) => {
    dispatch({
      type: SET_PAGINATION,
      payload: pagination,
    });
  };

export const selectCoin = (coin: Coin) => (dispatch: Dispatch) => {
  dispatch({
    type: SELECT_COIN,
    payload: coin,
  });
};

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

export const resetMarketChartData = () => (dispatch: Dispatch) => {
  dispatch({
    type: RESET_COIN_MARKET_CHART,
  });
};

export const resetDetailedData = () => (dispatch: Dispatch) => {
  dispatch({
    type: RESET_COIN_DETAILED_DATA,
  });
};

export const resetCoins = () => (dispatch: Dispatch) => {
  dispatch({
    type: RESET_COINS,
  });
};

export const fetchMarketChartByCoinID =
  (coinID: string) => async (dispatch: Dispatch) => {
    dispatch({
      type: FETCH_COIN_MARKET_CHART_REQUEST,
    });

    // FULL URL => https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily&precision=2

    const queryParams = `/market_chart?vs_currency=usd&days=30&interval=daily&precision=2`;
    const coinIdURL = `${API_BASE_URL}${coinID}${queryParams}`;
    try {
      const response = await axios.get(coinIdURL);
      if (response.status === SUCCESS_STATUS_REQUEST_CODE && response.data) {
        const data = response.data;
        const prices = data.prices;
        dispatch({
          type: FETCH_COIN_MARKET_CHART_REQUEST_SUCCESS,
          payload: prices,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_COIN_MARKET_CHART_REQUEST_FAILURE,
        payload: error?.toString(),
      });
    }
  };

export const fetchCoinDetailedData =
  (coinID: string) => async (dispatch: Dispatch) => {
    dispatch({
      type: FETCH_COIN_DETAILED_DATA,
    });

    // FULL URL => https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false

    const queryParams = `?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    const coinIdURL = `${API_BASE_URL}${coinID}${queryParams}`;
    try {
      const response = await axios.get(coinIdURL);
      if (response.status === SUCCESS_STATUS_REQUEST_CODE && response.data) {
        const data = response.data;
        const marketData = data.market_data;
        dispatch({
          type: FETCH_COIN_DETAILED_DATA_SUCCESS,
          payload: marketData,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_COIN_DETAILED_DATA_FAILURE,
        payload: error?.toString(),
      });
    }
  };

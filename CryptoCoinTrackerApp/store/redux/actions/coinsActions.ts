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
  SELECT_COIN_ID,
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
import { Pagination } from "../../../types/Pagination";

export const setPagination =
  (pagination: Pagination) => (dispatch: Dispatch) => {
    dispatch({
      type: SET_PAGINATION,
      payload: pagination,
    });
  };

export const selectCoinID = (ID: string) => (dispatch: Dispatch) => {
  dispatch({
    type: SELECT_COIN_ID,
    payload: ID,
  });
};

export const fetchCoins =
  (currentPage: number = 1, coinsPerPage: number, searchTerm: string) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: FETCH_COINS_REQUEST,
    });

    const queryParams = `?vs_currency=${CURRENCY_USD}&ids=${searchTerm}&page=${currentPage}&per_page=${coinsPerPage}&order=${MARKET_CAP_ORDER}&sparkline=${false}&locale=${LOCALE_EN}&price_change_percentage=${PRICE_CHANGE_PERCENTAGE_7D}&precision=${QUERY_PRECISION}`;
    const coinsMarketsURL = `${API_BASE_URL}${MARKETS_ENDPOINT}${queryParams}`;

    //api.coingecko.com/api/v3/coins/markets?ids=bitcoin&page=1&per_page=0&vs_currency=USD&order=market_cap_desc&sparkline=true&locale=en&price_change_percentage=7d&precision=2
    try {
      const response = await axios.get(coinsMarketsURL);

      if (response.status === SUCCESS_STATUS_REQUEST_CODE && response.data) {
        const coins = response.data;
        dispatch({
          type: FETCH_COINS_REQUEST_SUCCESS,
          payload: coins,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_COINS_REQUEST_FAILURE,
        payload: error?.toString(),
      });
    }
  };

export const resetMarketChartData = () => (dispatch: Dispatch) => {
  dispatch({
    type: RESET_COIN_MARKET_CHART,
    payload: null,
  });
};

export const resetDetailedData = () => (dispatch: Dispatch) => {
  dispatch({
    type: RESET_COIN_DETAILED_DATA,
    payload: null,
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

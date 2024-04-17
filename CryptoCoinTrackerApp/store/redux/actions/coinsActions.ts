import axios from "axios";
import { Dispatch } from "redux";

import {
  FETCH_COINS_REQUEST,
  FETCH_COINS_REQUEST_FAILURE,
  FETCH_COINS_REQUEST_SUCCESS,
} from "../../../constants/Coins";
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
export const fetchCoins =
  (currentPage: number, coinsPerPage: number, searchTerm: string[]) =>
  async (dispatch: Dispatch) => {
    const queryParams = `?ids=${searchTerm}&page=${currentPage}&per_page=${coinsPerPage}&vs_currency=${CURRENCY_USD}&order=${MARKET_CAP_ORDER}&sparkline=${true}&locale=${LOCALE_EN}&price_change_percentage=${PRICE_CHANGE_PERCENTAGE_7D}&precision=${QUERY_PRECISION}`;
    const coinsURL = `${API_BASE_URL}${MARKETS_ENDPOINT}${queryParams}`;

    dispatch({
      type: FETCH_COINS_REQUEST,
    });

    try {
      const response = await axios.get(coinsURL);
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

// TODO: 2 ENDPOINTS
//https://api.coingecko.com/api/v3/coins/bitcoin/history?date=17-03-2024
//https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false&market_chart?vs_currency=usd&days=30&interval=daily&precision=2

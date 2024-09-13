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

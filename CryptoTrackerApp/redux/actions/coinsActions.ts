import { createAsyncThunk } from "@reduxjs/toolkit";

import { Coin } from "../types/types";

export const fetchCoinsData = createAsyncThunk<
  Coin[],
  { currentPage: number; coinsPerPage: number }
>("coins/fetchCoinsData", async ({ currentPage, coinsPerPage }) => {
  // Construct the URL with pagination parameters
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinsPerPage}&page=${currentPage}&sparkline=false&locale=en`;

  // Fetch data from the constructed URL
  const response = await fetch(apiUrl);

  // Parse response data
  const data = await response.json();

  return data;
});

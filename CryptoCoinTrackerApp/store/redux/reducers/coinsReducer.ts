import { Coin, MarketData } from "../../../types/Coin";
import { Pagination } from "../../../types/Pagination";
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
} from "../actions/types/types";

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

interface ResetMarketChartData {
  type: typeof RESET_COIN_MARKET_CHART;
}

interface ResetCoins {
  type: typeof RESET_COINS;
}

interface ResetDetailedData {
  type: typeof RESET_COIN_DETAILED_DATA;
}

interface SetPagination {
  type: typeof SET_PAGINATION;
  payload: Pagination;
}

interface SelectCoin {
  type: typeof SELECT_COIN;
  payload: Coin;
}

interface FetchCoinsRequest {
  type: typeof FETCH_COINS_REQUEST;
}

interface FetchCoinsRequestSuccess {
  type: typeof FETCH_COINS_REQUEST_SUCCESS;
  payload: Coin[];
}

interface FetchCoinsRequestFailure {
  type: typeof FETCH_COINS_REQUEST_FAILURE;
  payload: string;
}

interface FetchCoinMarketDataRequest {
  type: typeof FETCH_COIN_MARKET_CHART_REQUEST;
}

interface FetchCoinMarketDataRequestSuccess {
  type: typeof FETCH_COIN_MARKET_CHART_REQUEST_SUCCESS;
  payload: [number, number][];
}

interface FetchCoinMarketDataRequestFailure {
  type: typeof FETCH_COIN_MARKET_CHART_REQUEST_FAILURE;
  payload: string;
}

interface FetchCoinDetailedDataRequest {
  type: typeof FETCH_COIN_DETAILED_DATA;
}

interface FetchCoinDetailedDataRequestSuccess {
  type: typeof FETCH_COIN_DETAILED_DATA_SUCCESS;
  payload: MarketData;
}

interface FetchCoinDetailedDataRequestFailure {
  type: typeof FETCH_COIN_DETAILED_DATA_FAILURE;
  payload: string;
}

type CoinsReducerAction =
  | ResetCoins
  | ResetDetailedData
  | ResetMarketChartData
  | SetPagination
  | SelectCoin
  | FetchCoinsRequest
  | FetchCoinsRequestSuccess
  | FetchCoinsRequestFailure
  | FetchCoinMarketDataRequest
  | FetchCoinMarketDataRequestSuccess
  | FetchCoinMarketDataRequestFailure
  | FetchCoinDetailedDataRequest
  | FetchCoinDetailedDataRequestSuccess
  | FetchCoinDetailedDataRequestFailure;

export function coinsReducer(state = initialState, action: CoinsReducerAction) {
  switch (action.type) {
    case RESET_COINS: {
      const stateCoins = [...(state.coins ?? [])];
      stateCoins.splice(0, stateCoins.length);
      return { ...state, coins: stateCoins };
    }
    case RESET_COIN_MARKET_CHART: {
      if (state.coinChartData) {
        const newCoinsMarketData = null;
        return { ...state, coinChartData: newCoinsMarketData };
      }
      return { ...state };
    }
    case RESET_COIN_DETAILED_DATA: {
      if (state.coinDetailedData) {
        const newCoinsDetailedData = null;
        return { ...state, coinDetailedData: newCoinsDetailedData };
      }
      return { ...state };
    }
    case SET_PAGINATION: {
      return { ...state, pagination: action.payload };
    }
    case SELECT_COIN:
      return { ...state, coin: action.payload };
    case FETCH_COINS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_COINS_REQUEST_SUCCESS: {
      const stateCoins = [...(state.coins ?? [])];
      const newCoins = action.payload.filter(
        (coin) => !stateCoins.includes(coin),
      );
      return {
        ...state,
        coins: [...stateCoins, ...newCoins],
        loading: false,
        error: null,
      };
    }
    case FETCH_COINS_REQUEST_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case FETCH_COIN_DETAILED_DATA:
      return { ...state, detailedLoading: true, detailedError: null };
    case FETCH_COIN_DETAILED_DATA_SUCCESS:
      return {
        ...state,
        coinDetailedData: action.payload,
        detailedLoading: false,
        detailedError: null,
      };
    case FETCH_COIN_DETAILED_DATA_FAILURE:
      return {
        ...state,
        detailedError: action.payload,
        detailedLoading: false,
      };
    case FETCH_COIN_MARKET_CHART_REQUEST:
      return { ...state, chartLoading: true, chartError: null };
    case FETCH_COIN_MARKET_CHART_REQUEST_SUCCESS:
      return {
        ...state,
        coinChartData: action.payload,
        chartLoading: false,
        chartError: null,
      };
    case FETCH_COIN_MARKET_CHART_REQUEST_FAILURE:
      return { ...state, chartError: action.payload, chartLoading: false };
    default:
      return state;
  }
}

import {
  FETCH_COINS_REQUEST,
  FETCH_COINS_REQUEST_FAILURE,
  FETCH_COINS_REQUEST_SUCCESS,
} from "../../../constants/Coins";
import { Coin } from "../types/types";

interface CoinsState {
  coins: Coin[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: CoinsState = {
  coins: null,
  loading: false,
  error: null,
};

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

type CoinsReducerAction =
  | FetchCoinsRequest
  | FetchCoinsRequestSuccess
  | FetchCoinsRequestFailure;

export function coinsReducer(state = initialState, action: CoinsReducerAction) {
  switch (action.type) {
    case FETCH_COINS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_COINS_REQUEST_SUCCESS:
      return { ...state, coins: action.payload, loading: false, error: null };
    case FETCH_COINS_REQUEST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

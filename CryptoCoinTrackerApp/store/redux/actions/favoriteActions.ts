import { Coin } from "../../../types/Coin";
import { markFavorite, unmarkFavorite } from "../reducers/favoritesReducer";
import { AppThunk } from "../store";

export const markFavoriteAsync =
  (coin: Coin): AppThunk =>
  (dispatch) => {
    dispatch(markFavorite(coin));
  };

export const unmarkFavoriteAsync =
  (coinID: string): AppThunk =>
  (dispatch) => {
    dispatch(unmarkFavorite(coinID));
  };

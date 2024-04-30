import { Dispatch } from "redux";

import { MARK_FAVORITE, UNMARK_FAVORITE } from "./types/types";
import { Coin } from "../../../types/Coin";

export const markFavorite = (coin: Coin) => (dispatch: Dispatch) => {
  dispatch({
    type: MARK_FAVORITE,
    payload: coin,
  });
};

export const unmarkFavorite = (coinID: string) => (dispatch: Dispatch) => {
  dispatch({
    type: UNMARK_FAVORITE,
    payload: coinID,
  });
};

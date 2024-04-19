import { Dispatch } from "redux";

import { MARK_FAVORITE, UNMARK_FAVORITE } from "./types/types";

export const markFavorite = (coinID: string) => (dispatch: Dispatch) => {
  dispatch({
    type: MARK_FAVORITE,
    payload: coinID,
  });
};

export const unmarkFavorite = (coinID: string) => (dispatch: Dispatch) => {
  dispatch({
    type: UNMARK_FAVORITE,
    payload: coinID,
  });
};

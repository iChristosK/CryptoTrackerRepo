import { MARK_FAVORITE, UNMARK_FAVORITE } from "../actions/types/types";

interface FavoritesState {
  favoriteCoins: string[];
}

const initialState: FavoritesState = {
  favoriteCoins: [] as string[],
};

interface MarkFavorite {
  type: typeof MARK_FAVORITE;
  payload: string;
}
interface UnmarkFavorite {
  type: typeof UNMARK_FAVORITE;
  payload: string;
}

type FavoriteReducerAction = MarkFavorite | UnmarkFavorite;

export function favoritesReducer(
  state = initialState,
  action: FavoriteReducerAction,
) {
  switch (action.type) {
    case MARK_FAVORITE: {
      return {
        ...state,
        favoriteCoins: [...state.favoriteCoins, action.payload],
      };
    }
    case UNMARK_FAVORITE: {
      return {
        ...state,
        favoriteCoins: {
          ...state.favoriteCoins.filter((coinID) => coinID !== action.payload),
        },
      };
    }
    default:
      return state;
  }
}

import { Coin } from "../../../types/Coin";
import { MARK_FAVORITE, UNMARK_FAVORITE } from "../actions/types/types";

interface FavoritesState {
  favoriteCoins: Coin[];
}

const initialState: FavoritesState = {
  favoriteCoins: [] as Coin[],
};

interface MarkFavorite {
  type: typeof MARK_FAVORITE;
  payload: Coin;
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
      const newFavoritesCoins = [...state.favoriteCoins];
      const favoriteCoins = newFavoritesCoins.filter(
        (coin) => coin !== action.payload,
      );
      return {
        ...state,
        favoriteCoins: [...favoriteCoins, action.payload],
      };
    }
    case UNMARK_FAVORITE: {
      const newFavoritesCoins = [...state.favoriteCoins];
      const filteredFavorites = newFavoritesCoins.filter(
        (coin) => coin.id !== action.payload,
      );
      return {
        ...state,
        favoriteCoins: filteredFavorites,
      };
    }
    default:
      return state;
  }
}

import { combineReducers } from "redux";

import { coinsReducer } from "./coinsReducer";
import { favoritesReducer } from "./favoritesReducer";

export const appReducer = combineReducers({
  favorites: favoritesReducer,
  coins: coinsReducer,
});

import { composeWithDevTools } from "@redux-devtools/extension";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  AnyAction,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";
import { ThunkAction, ThunkDispatch, thunk } from "redux-thunk";

import { appReducer } from "./reducers/appReducer";

export const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof appReducer>;
export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

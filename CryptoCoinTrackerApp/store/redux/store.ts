// import { Middleware, configureStore } from "@reduxjs/toolkit";
// import { useDispatch, useSelector } from "react-redux";

// import { appReducer } from "./reducers/appReducer";

// const myMiddleware: Middleware = (store) => (next) => (action) => {
//   console.log("Action dispatched:", action);
//   console.log(store.getState());
//   return next(action);
// };
// export const store = configureStore({
//   reducer: appReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(myMiddleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// export const useAppSelector = useSelector.withTypes<RootState>();

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

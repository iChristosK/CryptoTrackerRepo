import { Middleware, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { appReducer } from "./reducers/appReducer";

const myMiddleware: Middleware = (store) => (next) => (action) => {
  // You can perform any logic here before passing the action to the reducer
  console.log("Action dispatched:", action);
  // Pass the action to the next middleware or the reducer
  return next(action);
};
export const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(myMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

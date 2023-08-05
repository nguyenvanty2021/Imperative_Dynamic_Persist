import { configureStore } from "@reduxjs/toolkit";
import counterSlide from "./counterSlide";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["counterSlide"],
};
const rootReducer = combineReducers({
  counterSlide,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);

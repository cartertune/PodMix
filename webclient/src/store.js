import { createStore } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authReducer";
import homePageReducer from "./UI/home-page/homePageReducer";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistCombineReducers(persistConfig, {
  auth: authReducer,
  homePage: homePageReducer,
});

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);

import { createStore, combineReducers } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createPageReducer from "./UI/create-page/createPageReducer";
import playlistPageReducer from "./UI/playlist-page/playlistPageReducer";
import authReducer from "./auth/authReducer";
import headerReducer from "./UI/header/headerReducer";

const persistConfig = {
  key: "root",
  storage
};
const persistedReducer = persistCombineReducers(persistConfig, {
  auth: authReducer,
  header: headerReducer
});

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);

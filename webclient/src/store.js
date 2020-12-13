import { createStore } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authReducer";
import homePageReducer from "./UI/dashboard/homePageReducer";
import projectPageReducer from "./UI/project-page/projectPageReducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["projectPage"],
};
const persistedReducer = persistCombineReducers(persistConfig, {
  auth: authReducer,
  homePage: homePageReducer,
  projectPage: projectPageReducer,
});

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);

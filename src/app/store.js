import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
const persistConfig = {
  key: "login",
  storage,
  whitelist: ["login"],
  version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
});

export const persistor = persistStore(store);
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import createWebStorage from "redux-persist/es/storage/createWebStorage";
import vendorReducer from "@/features/vendor/vendorSlice";

const storage = createWebStorage("local");

const persistConfig = {
  key: "vendor-onboarding",
  storage,
};

const persistedVendorReducer = persistReducer(
  persistConfig,
  vendorReducer
);

export const store = configureStore({
  reducer: {
    vendor: persistedVendorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
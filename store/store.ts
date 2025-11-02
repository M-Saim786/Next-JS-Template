// store/index.js
"use client"; // Ensure this file is a Client Component

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage for browser
// import cartSlice from './slices/cartSlice';
// import authSlice from "./slices/authSlice";


// Persist config for cart slice
const persistConfig = {
  key: 'persist-data', // Key for localStorage
  version: 1.1,
  storage,
  whitelist: ['cart', 'auth'], // Only persist the cart slice
};

// Combine reducers
const rootReducer = combineReducers({
//   cart: cartSlice,
//   auth: authSlice,
});

// Apply persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore persist actions
      },
    }),
});

// Create persistor
// export const persistor = (store);
export const persistor = persistStore(store);


// ✅ Inferred types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
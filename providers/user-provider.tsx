// app/providers.tsx
"use client";

import { persistor, store } from '@/store/store';
import { Provider } from 'react-redux';
// import { persistor, store } from '../store'; // Adjust path to your store
import { PersistGate } from 'redux-persist/integration/react';

export default function UserProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
/* eslint-disable @typescript-eslint/typedef */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import accountReducer from './features/accountSlice';

export const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['register', 'notification']
};

const appReducer = combineReducers({
  account: accountReducer
});

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk]
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
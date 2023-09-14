/* eslint-disable @typescript-eslint/typedef */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

import accountReducer from './features/accountSlice';
import botReducer from './features/botSlice';
import chatReducer from './features/chatSlice';

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['']
};

const appReducer = combineReducers({
  account: accountReducer,
  bot: botReducer,
  chat: chatReducer
});

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk]
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;

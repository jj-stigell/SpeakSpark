/* eslint-disable @typescript-eslint/typedef */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Account {
  id: string,
  email: string,
  darkMode: boolean,
  uiLanguage: string,
  studyLanguage: string
}

export interface AccountState {
  isLoggedIn: boolean,
  account: Account
}

const initialState: AccountState = {
  isLoggedIn: false,
  account: {
    id: '',
    email: '',
    darkMode: false,
    uiLanguage: 'en',
    studyLanguage: 'jp'
  }
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount(state, action: PayloadAction<Account>) {
      return {
        isLoggedIn: true,
        account: action.payload
      };
    },
    resetAccount() {
      return initialState;
    }
  }
});

export const { setAccount, resetAccount } = accountSlice.actions;

export default accountSlice.reducer;

/* eslint-disable @typescript-eslint/typedef */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Account {
  id: string,
  email: string,
  token: string,
  darkMode: boolean,
  uiLanguage: string,
  studyLanguage: string
}

export interface AccountState {
  isLoggedIn: boolean,
  account: Account
}

export const initialState: AccountState = {
  isLoggedIn: false,
  account: {
    id: '',
    email: '',
    token: '',
    darkMode: false,
    uiLanguage: 'en',
    studyLanguage: 'jp'
  }
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount(state, action: PayloadAction<AccountState>) {
      return action.payload;
    },
    resetAccount() {
      return {
        isLoggedIn: false,
        account: {
          ...initialState.account
        }
      };
    }
  }
});

export const { setAccount, resetAccount } = accountSlice.actions;

export default accountSlice.reducer;

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
    setStudyLanguage(state, action: PayloadAction<string>) {
      return {
        isLoggedIn: true,
        account: {
          ...state.account,
          studyLanguage: action.payload
        }
      };
    },
    setUiLanguage(state, action: PayloadAction<string>) {
      return {
        isLoggedIn: true,
        account: {
          ...state.account,
          uiLanguage: action.payload
        }
      };
    },
    toggleDarkMode(state) {
      return {
        isLoggedIn: true,
        account: {
          ...state.account,
          darkMode: !state.account.darkMode
        }
      };
    },
    resetAccount() {
      return initialState;
    }
  }
});

export const {
  resetAccount,
  setAccount,
  setStudyLanguage,
  setUiLanguage,
  toggleDarkMode
} = accountSlice.actions;

export default accountSlice.reducer;

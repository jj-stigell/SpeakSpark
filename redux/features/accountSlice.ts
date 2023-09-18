/* eslint-disable @typescript-eslint/typedef */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Account {
  id: string,
  email: string,
  darkMode: boolean,
  uiLanguage: string,
  studyLanguage: string,
  notifications: boolean
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
    studyLanguage: 'jp',
    notifications: true
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
    toggleNotifications(state) {
      return {
        isLoggedIn: true,
        account: {
          ...state.account,
          notifications: !state.account.notifications
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
  toggleDarkMode,
  toggleNotifications
} = accountSlice.actions;

export default accountSlice.reducer;

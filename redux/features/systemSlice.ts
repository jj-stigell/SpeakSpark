/* eslint-disable @typescript-eslint/typedef */
import { createSlice } from '@reduxjs/toolkit';
import { Appearance, ColorSchemeName } from 'react-native';
import { ColorScheme, dark, light } from '../../utils/colors';

const colorScheme: ColorSchemeName = Appearance.getColorScheme();

export interface System {
  darkMode: boolean,
  notifications: boolean,
  theme: ColorScheme
}

const initialState: System = {
  darkMode: colorScheme === 'dark',
  notifications: true,
  theme: colorScheme === 'dark' ? dark : light
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      return {
        ...state,
        darkMode: !state.darkMode,
        theme: !state.darkMode ? dark : light
      };
    },
    toggleNotifications(state) {
      return {
        ...state,
        notifications: !state.notifications
      };
    },
    resetSystem() {
      return initialState;
    }
  }
});

export const { toggleDarkMode, toggleNotifications } = systemSlice.actions;

export default systemSlice.reducer;

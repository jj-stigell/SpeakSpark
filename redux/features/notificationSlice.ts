/* eslint-disable @typescript-eslint/typedef */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Severity = 'info' | 'warning' | 'error' | 'success'

export interface Notification {
  showNotification?: boolean,
  message: string,
  autoHideDuration?: number,
  severity: Severity
}

const initialState: Notification = {
  showNotification: false,
  message: 'notification message missing',
  autoHideDuration: 5000,
  severity: 'success'
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action: PayloadAction<Notification>) {
      return {
        showNotification: true,
        message: action.payload?.message ?? initialState.message,
        autoHideDuration: action.payload?.autoHideDuration ?? initialState.autoHideDuration,
        severity: action.payload?.severity ?? initialState.severity
      };
    },
    resetNotification() {
      return initialState;
    }
  }
});

export const { resetNotification, setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
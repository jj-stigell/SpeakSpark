/* eslint-disable @typescript-eslint/typedef */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Bot {
  id: string,
  name: string,
  nameRomaji: string,
  profileImage: string,
  persona: string,
  language: string,
  welcomeMessage: string,
  welcomeAudio: string
}

export const initialState: Array<Bot> = [];

const botSlice = createSlice({
  name: 'bot',
  initialState,
  reducers: {
    addUniqueBots(state, action: PayloadAction<Array<Bot>>) {
      return state.concat(action.payload.filter((bot: Bot) => !state.includes(bot)));
    },
    resetBots() {
      return initialState;
    }
  }
});

export const { addUniqueBots, resetBots } = botSlice.actions;

export default botSlice.reducer;

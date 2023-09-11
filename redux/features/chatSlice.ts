/* eslint-disable @typescript-eslint/typedef */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ChatRole = 'USER' | 'BOT';

export interface Message {
    id: string,
    message: string,
    audio: string,
    role: ChatRole,
    createdAt: Date
}

export interface Chat {
  id: string,
  botId: string,
  messages: Array<Message>,
  createdAt: Date,
  updatedAt: Date
}

export const initialState: Array<Chat> = [];

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChat(state, action: PayloadAction<Chat>) {
      return state.concat(action.payload);
    },
    resetChats() {
      return initialState;
    }
  }
});

export const { addChat, resetChats } = chatSlice.actions;

export default chatSlice.reducer;

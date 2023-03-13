import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface StylistChatState {
  messages: Array<Object>;
}

const initialState: StylistChatState = {
  messages: [],
};

export const stylistChatSlice = createSlice({
  name: "stylistChat",
  initialState,
  reducers: {
    addMessages: (state, action: PayloadAction<Array<Object>>) => {
      action.payload.map((m) => state.messages.push(m));
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessages, clearMessages } = stylistChatSlice.actions;
export default stylistChatSlice.reducer;

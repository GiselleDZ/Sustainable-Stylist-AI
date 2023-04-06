import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface StylistChatState {
  messages: Array<{ role: string; content: string }>;
  summary: string;
  recommendations: Array<string>;
  likedRecommendations: { [index: number]: boolean };
}

const initialState: StylistChatState = {
  messages: [],
  summary: "",
  recommendations: [],
  likedRecommendations: {},
};

export const stylistChatSlice = createSlice({
  name: "stylistChat",
  initialState,
  reducers: {
    addMessages: (
      state,
      action: PayloadAction<Array<{ role: string; content: string }>>
    ) => {
      action.payload.map((m) => state.messages.push(m));
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    addSummary: (state, action: PayloadAction<string>) => {
      state.summary = action.payload;
    },
    addRecommendations: (state, action: PayloadAction<Array<string>>) => {
      state.recommendations = [...state.recommendations, ...action.payload];
    },
    likeRecommendation: (state, action: PayloadAction<number>) => {
      state.likedRecommendations[action.payload] = true;
    },
    unlikeRecommendation: (state, action: PayloadAction<number>) => {
      state.likedRecommendations[action.payload] = false;
    },
  },
});

export const {
  addMessages,
  clearMessages,
  addSummary,
  addRecommendations,
  likeRecommendation,
  unlikeRecommendation,
} = stylistChatSlice.actions;

export default stylistChatSlice.reducer;

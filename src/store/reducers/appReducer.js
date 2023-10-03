import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEnglish: true,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    connect: (state, action) => {
      state.isEnglish = action.payload.isEnglish;
    },
  },
});

export const { connect } = appSlice.actions;

export default appSlice.reducer;

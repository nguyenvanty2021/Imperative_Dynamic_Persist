import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  count: 0,
};
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementCount: (state, action) => {
      state.count += action.payload;
    },
  },
});
export const { incrementCount } = counterSlice.actions;
export default counterSlice.reducer;

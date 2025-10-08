import { createSlice } from "@reduxjs/toolkit";

const stackSlice = createSlice({
  name: "stack",
  initialState: { items: [] },
  reducers: {
    pushItem: (state, action) => {
      state.items.push(action.payload);
    },
    popItem: (state) => {
      state.items.pop();
    },
    clearStack: (state) => {
      state.items = [];
    },
  },
});

export const { pushItem, popItem, clearStack } = stackSlice.actions;
export default stackSlice.reducer;

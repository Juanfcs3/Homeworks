import { createSlice } from "@reduxjs/toolkit";
import { fetchQueue, addMessage } from "./queueThunks";

const queueSlice = createSlice({
  name: "queue",
  initialState: { queue: [] },
  reducers: {
    dequeueLocal(state) {
      state.queue.shift();
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchQueue.fulfilled, (s, a) => { s.queue = a.payload; });
    b.addCase(addMessage.fulfilled, (s, a) => { s.queue.push(a.payload); });
  },
});

export const { dequeueLocal } = queueSlice.actions;
export default queueSlice.reducer;

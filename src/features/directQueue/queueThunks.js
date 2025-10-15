import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../auth/firebaseConfig";
import { ref, push, get, child } from "firebase/database";

export const fetchQueue = createAsyncThunk("queue/fetchQueue", async () => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, "queue"));
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
  } else {
    return [];
  }
});

export const addMessage = createAsyncThunk("queue/addMessage", async (message) => {
  const queueRef = ref(db, "queue");
  const newMsgRef = await push(queueRef, {
    text: message,
    timestamp: Date.now(),
  });
  return { id: newMsgRef.key, text: message };
});

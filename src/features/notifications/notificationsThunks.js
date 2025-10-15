import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../auth/firebaseConfig";
import { ref, get, push, child } from "firebase/database";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, "notifications"));
    if (snapshot.exists()) {
      const data = snapshot.val();
      const list = Object.keys(data)
        .map((key) => ({ id: key, ...data[key] }))
        .sort((a, b) => b.timestamp - a.timestamp);
      return list;
    } else {
      return [];
    }
  }
);

export const addNotification = createAsyncThunk(
  "notifications/addNotification",
  async (message) => {
    const notifRef = ref(db, "notifications");
    const newNotifRef = await push(notifRef, {
      message,
      timestamp: Date.now(),
    });
    return { id: newNotifRef.key, message, timestamp: Date.now() };
  }
);

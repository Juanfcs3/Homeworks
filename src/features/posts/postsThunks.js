import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../auth/firebaseConfig";
import { ref, get, push, child } from "firebase/database";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, "posts"));
  if (snapshot.exists()) {
    const data = snapshot.val();
    const list = Object.keys(data)
      .map((key) => ({ id: key, ...data[key] }))
      .sort((a, b) => b.timestamp - a.timestamp);
    return list;
  } else {
    return [];
  }
});

export const addPost = createAsyncThunk("posts/addPost", async (postData) => {
  const postsRef = ref(db, "posts");
  const newPostRef = await push(postsRef, {
    ...postData,
    timestamp: Date.now(),
  });
  return { id: newPostRef.key, ...postData, timestamp: Date.now() };
});

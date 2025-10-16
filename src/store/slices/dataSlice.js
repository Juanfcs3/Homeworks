import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";
import { ref, push } from "firebase/database";
import { db, rtdb } from "../../firebase/config";

export const startRealtimeNotes = createAsyncThunk(
  "data/startRealtimeNotes",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const q = query(collection(db, "notes"), orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const notes = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        dispatch(setNotes(notes));
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addNote = createAsyncThunk(
  "data/addNote",
  async ({ title, body }, { rejectWithValue }) => {
    try {
      await addDoc(collection(db, "notes"), {
        title,
        body,
        createdAt: Date.now(),
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateNote = createAsyncThunk(
  "data/updateNote",
  async ({ id, title, body }, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "notes", id);
      await updateDoc(docRef, { title, body, updatedAt: Date.now() });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "data/deleteNote",
  async ({ id }, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "notes", id));
      return { id };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const sendMessageRT = createAsyncThunk(
  "data/sendMessageRT",
  async ({ screenId, message, uid }, { rejectWithValue }) => {
    try {
      const refScreen = ref(rtdb, `messages/${screenId}`);
      const newRef = await push(refScreen, {
        text: message,
        uid,
        ts: Date.now(),
      });
      return { key: newRef.key, text: message, uid };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: { notes: [], status: "idle", error: null, messages: {} },
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setNotes(state, action) {
      state.notes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNote.rejected, (s, a) => {
        s.error = a.payload;
      })
      .addCase(updateNote.rejected, (s, a) => {
        s.error = a.payload;
      })
      .addCase(deleteNote.rejected, (s, a) => {
        s.error = a.payload;
      });
  },
});

export const { setMessages, setNotes } = dataSlice.actions;
export default dataSlice.reducer;

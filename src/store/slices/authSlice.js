import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, googleProvider } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Thunks
export const loginWithEmail = createAsyncThunk(
  "auth/loginWithEmail",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return { uid: res.user.uid, email: res.user.email };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const registerWithEmail = createAsyncThunk(
  "auth/registerWithEmail",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return { uid: res.user.uid, email: res.user.email };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      return { uid: res.user.uid, email: res.user.email, displayName: res.user.displayName };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return {};
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, status: "idle", error: null },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithEmail.pending, (s) => { s.status = "loading"; s.error = null; })
      .addCase(loginWithEmail.fulfilled, (s, a) => { s.status = "succeeded"; s.user = a.payload; })
      .addCase(loginWithEmail.rejected, (s, a) => { s.status = "failed"; s.error = a.payload; })

      .addCase(loginWithGoogle.pending, (s) => { s.status = "loading"; s.error = null; })
      .addCase(loginWithGoogle.fulfilled, (s, a) => { s.status = "succeeded"; s.user = a.payload; })
      .addCase(loginWithGoogle.rejected, (s, a) => { s.status = "failed"; s.error = a.payload; })

      .addCase(logoutUser.fulfilled, (s) => { s.user = null; s.status = "idle"; });
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

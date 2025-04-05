import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { authError } from "../../../types/authentication";
import { doc, setDoc, getFirestore } from "firebase/firestore";

type loginPayload = {
  email: string;
  password: string;
};

type registerPayload = {
  email: string;
  password: string;
  displayName: string;
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { email, password, displayName }: registerPayload,
    { rejectWithValue }
  ) => {
    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredentials.user, {
        displayName: displayName,
      });

      const userDocRef = doc(
        getFirestore(),
        `users/${userCredentials.user.uid}`
      );

      await setDoc(userDocRef, {
        uid: userCredentials.user.uid,
        email: email,
        displayName: displayName,
      });

      return {
        user: {
          email: userCredentials.user.email,
          id: userCredentials.user.uid,
          name: displayName,
        },
      };
    } catch (e) {
      if (e instanceof Error) {
        const serverError = e as authError;
        return rejectWithValue(serverError.code);
      } else {
        const serverError = e as Error;
        return rejectWithValue(serverError.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: loginPayload, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return {
        user: {
          email: userCredentials.user.email,
          id: userCredentials.user.uid,
          name: userCredentials.user.displayName,
        },
      };
    } catch (e) {
      if (e instanceof Error) {
        const serverError = e as authError;
        return rejectWithValue(serverError.code);
      } else {
        const serverError = e as Error;
        return rejectWithValue(serverError.message);
      }
    }
  }
);

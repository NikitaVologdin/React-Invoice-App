import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./authActions";
import type { RootState } from "../../store";
import { AuthState } from "../../../types/authentication";
import { UserInfo } from "../../../types/user";

const initialState: AuthState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = { ...action.payload };
    },
    logOutUser: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.userInfo = payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.userInfo = payload.user as UserInfo;
      });
  },
});
export const selectAuth = (state: RootState) => state.auth;
export const { authenticateUser, logOutUser } = authSlice.actions;
export default authSlice.reducer;

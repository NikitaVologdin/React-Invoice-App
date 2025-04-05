import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationState } from "../../../types/notification";
import { RootState } from "../../store";

const initialState: NotificationState = {
  message: null,
  shown: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<string>) => {
      state.shown = true;
      state.message = action.payload;
    },
    resetNotification: (state) => {
      state.shown = false;
      state.message = null;
    },
  },
});

export const selectNotification = (state: RootState) => state.notification;
export const { showNotification, resetNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;

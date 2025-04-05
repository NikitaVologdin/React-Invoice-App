import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  THIS_DAY,
  THIS_MONTH,
  THIS_YEAR,
} from "../../../components/form/date/helpers";

import { RootState } from "../../store";

interface DatePickerState {
  calendarOpen: boolean;
  date: [number, number, number];
}

const initialState: DatePickerState = {
  calendarOpen: false,
  date: [THIS_DAY, THIS_MONTH, THIS_YEAR],
};

export const datePickerSlice = createSlice({
  name: "datePicker",
  initialState,
  reducers: {
    setCalendarOpen: (state, action: PayloadAction<boolean>) => {
      state.calendarOpen = action.payload;
    },
  },
});

export default datePickerSlice.reducer;

export const { setCalendarOpen } = datePickerSlice.actions;

export const selectDatePicker = (state: RootState) => state.datePicker;

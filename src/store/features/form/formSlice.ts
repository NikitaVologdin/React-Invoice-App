import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface FormState {
  InvoiceDate: string;
  openForm: boolean;
}

const initialState: FormState = {
  InvoiceDate: "",
  openForm: false,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setInvoiceDate: (
      state,
      action: PayloadAction<[number, number, number]>
    ) => {
      state.InvoiceDate = action.payload.join("-");
    },
    setOpenForm: (state, action: PayloadAction<boolean>) => {
      state.openForm = action.payload;
    },
  },
});

export default formSlice.reducer;
export const { setInvoiceDate, setOpenForm } = formSlice.actions;
export const selectForm = (state: RootState) => state.form;

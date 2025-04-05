import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Option } from "../../../types/terms";

interface TermsState {
  termsOpen: boolean;
  option: Option;
}

const initialState: TermsState = {
  termsOpen: false,
  option: "Net 1 day",
};

const termsSlice = createSlice({
  name: "terms",
  initialState,
  reducers: {
    setTermsOpen: (state, action: PayloadAction<boolean>) => {
      state.termsOpen = action.payload;
    },
    setOption: (state, action: PayloadAction<Option>) => {
      state.option = action.payload;
    },
  },
});

export default termsSlice.reducer;

export const { setTermsOpen, setOption } = termsSlice.actions;

export const selectTerms = (state: RootState) => state.terms;

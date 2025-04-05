import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { filterItem } from "../../../types/filter";

interface FilterState {
  filters: filterItem[];
}

const initialState: FilterState = {
  filters: [],
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<filterItem>) => {
      state.filters.push(action.payload);
    },
    removeFilter: (state, action: PayloadAction<filterItem>) => {
      const item = action.payload;
      const index = state.filters.indexOf(item);
      state.filters.splice(index, 1);
    },
  },
});

export const { addFilter, removeFilter } = filterSlice.actions;

export const selectFilters = (state: RootState) => state.filters.filters;

export default filterSlice.reducer;

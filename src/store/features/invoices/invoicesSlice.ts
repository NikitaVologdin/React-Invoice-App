import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { invoice as Invoice, paidStatus } from "../../../types/invoice";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { InvoiceState } from "../../../types/invoice";
import { EditedInvoiceType, NewInvoiceType } from "../../../types/form";

const initialState: InvoiceState = {
  invoices: [] as Invoice[],
  loading: false,
  error: null,
  success: null,
  deleted: false,
  updated: false,
  edited: false,
};

export const deleteInvoice = createAsyncThunk.withTypes<{
  state: RootState;
  rejectValue: string;
}>()(
  "invoices/delete",
  async (invoiceId: string, { rejectWithValue, getState, dispatch }) => {
    const state = getState();
    const userId = state.auth.userInfo?.id;
    if (!userId) {
      return rejectWithValue(`User not authenticated`);
    }
    const prevInvoicesState = state.invoices.invoices;
    const updatedInvoices = state.invoices.invoices.filter(
      (item) => item.id !== invoiceId
    );
    dispatch(initializeInvoices(updatedInvoices));
    try {
      await deleteDoc(doc(db, "invoices", invoiceId));
      return `Invoice ${invoiceId} has been deleted`;
    } catch (e) {
      dispatch(initializeInvoices(prevInvoicesState));
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue("Error occurred");
    }
  }
);

export const updateStatus = createAsyncThunk.withTypes<{ state: RootState }>()(
  "invoices/updateStatus",
  async (invoiceId: string, { rejectWithValue, getState, dispatch }) => {
    const state = getState();
    const userId = state.auth.userInfo?.id;
    if (!userId) {
      return rejectWithValue(`User not authenticated`);
    }

    const invoiceRef = doc(db, "invoices", invoiceId);
    const invoiceDoc = await getDoc(invoiceRef);

    if (!invoiceDoc.exists()) {
      return rejectWithValue(`Invoice with ID ${invoiceId} not found`);
    }
    const invoiceSnapshot = invoiceDoc.data();

    if (invoiceSnapshot.status === "paid") {
      return rejectWithValue(
        `Invoice with ID ${invoiceId} has already been paid`
      );
    }

    const prevInvoiceState = state.invoices.invoices.find(
      (i) => i.id === invoiceId
    )!;
    dispatch(updateInvoiceStatus({ invoiceId, status: "paid" }));

    try {
      await updateDoc(invoiceRef, { status: "paid" });
      return `Invoice ${invoiceId} status has been updated`;
    } catch (e) {
      dispatch(
        updateInvoiceStatus({ invoiceId, status: prevInvoiceState.status })
      );
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue("Error occurred");
    }
  }
);

const invoicesSLice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    initializeInvoices: (state, action: PayloadAction<Invoice[]>) => {
      state.invoices = action.payload;
    },
    resetInvoicesState: (state) => {
      state.success = null;
      state.error = null;
      state.loading = false;
      state.deleted = false;
      state.updated = false;
      state.edited = false;
    },
    addInvoice: (state, action: PayloadAction<NewInvoiceType>) => {
      state.invoices.push(action.payload!);
    },
    removeInvoice: (state, action: PayloadAction<string>) => {
      const invoiceId = action.payload;
      state.invoices.filter((doc) => doc.id !== invoiceId);
    },
    updateInvoiceStatus: (
      state,
      action: PayloadAction<{ invoiceId: string; status: paidStatus }>
    ) => {
      const { invoiceId, status } = action.payload;
      const invoice = state.invoices.find((item) => item.id === invoiceId);
      if (invoice) {
        invoice.status = status;
      }
    },
    updateInvoice: (
      state,
      action: PayloadAction<{ invoiceId: string; changes: EditedInvoiceType }>
    ) => {
      const { invoiceId, changes } = action.payload;
      const index = state.invoices.findIndex(
        (invoice) => invoice.id === invoiceId
      );
      state.invoices[index] = { ...state.invoices[index], ...changes };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteInvoice.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteInvoice.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(deleteInvoice.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.deleted = true;
        if (payload) {
          state.success = payload;
        }
      })
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStatus.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(updateStatus.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          state.success = payload;
          state.updated = true;
        }
      });
  },
});

export const {
  initializeInvoices,
  resetInvoicesState,
  addInvoice,
  removeInvoice,
  updateInvoiceStatus,
  updateInvoice,
} = invoicesSLice.actions;

export const selectInvoices = (state: RootState) => state.invoices;

export default invoicesSLice.reducer;

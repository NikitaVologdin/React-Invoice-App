import { db } from "../firebase/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { RootState, store } from "../store/store";
import { initializeInvoices } from "../store/features/invoices/invoicesSlice";
import { invoice } from "../types/invoice";

async function loadInvoices({ userId }: { userId: string }) {
  try {
    const invoicesRef = collection(db, "invoices");
    const q = query(
      invoicesRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const invoices = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as invoice[];
    if (invoices.length) {
      store.dispatch(initializeInvoices(invoices));
      return invoices;
    }
  } catch (error) {
    console.error("Error fetching invoices:", error);
  }
}

function findInvoice(invoiceId: string, invoices: invoice[]) {
  return invoices.find((invoice) => {
    return invoice.id === invoiceId;
  });
}

export async function invoicesLoader({ userId }: { userId: string }) {
  const state: RootState = store.getState();

  if (state.invoices.invoices.length > 0) {
    return state.invoices.invoices;
  }
  return await loadInvoices({ userId });
}

export async function invoiceLoader({
  invoiceId,
  userId,
}: {
  invoiceId: string;
  userId: string;
}) {
  const state: RootState = store.getState();

  if (state.invoices.invoices.length === 0) {
    const invoices = await loadInvoices({ userId });
    if (invoices) {
      const invoice = findInvoice(invoiceId, invoices);
      if (!invoice) {
        throw new Error(`Invoice with ID ${invoiceId} not found`);
      }
      return invoice;
    }
  }

  const invoice = findInvoice(invoiceId, state.invoices.invoices);

  if (!invoice) {
    throw new Error(`Invoice with ID ${invoiceId} not found`);
  }

  return invoice;
}

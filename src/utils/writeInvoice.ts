import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  EditedInvoiceType,
  ErrorWithId,
  FormValues,
  NewInvoiceType,
  PartialFormValues,
} from "../types/form";
import { item, paidStatus } from "../types/invoice";
import {
  THIS_DAY,
  THIS_MONTH,
  THIS_YEAR,
} from "../components/form/date/helpers";

function getCurrentDateString(
  array: number[] = [THIS_DAY, THIS_MONTH, THIS_YEAR]
): string {
  const date = new Date(array[2], array[1], array[0]);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getPaymentTerms(value: string) {
  const regEx = /\d+/;
  const match = value.match(regEx)![0];
  const days = parseInt(match);
  return days;
}

function getPaymentDue(value: string) {
  const date = new Date();
  const days = getPaymentTerms(value);
  date.setDate(date.getDate() + days);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getTotal(items: item[]) {
  return items.reduce((acc, item) => (acc += item.total || 0), 0);
}

function generateCustomId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter1 = letters.charAt(
    Math.floor(Math.random() * letters.length)
  );
  const randomLetter2 = letters.charAt(
    Math.floor(Math.random() * letters.length)
  );
  const numbers = Math.floor(1000 + Math.random() * 9000);

  return `${randomLetter1}${randomLetter2}${numbers}`;
}

async function getUniqueId(): Promise<string | undefined> {
  let id;
  let exists = true;

  while (exists) {
    id = generateCustomId();
    const snapshot = await getDocs(
      query(collection(db, "invoices"), where("id", "==", id))
    );
    exists = !snapshot.empty;
  }
  if (id) return id;
}

export async function writeInvoice(publicId: string, document: NewInvoiceType) {
  try {
    const docRef = doc(db, "invoices", publicId);
    await setDoc(docRef, document);
    return document;
  } catch (e) {
    console.error("Error writing invoice:", e);
    throw new ErrorWithId("Failed to write invoice to the database.", publicId);
  }
}

export async function uploadEditedInvoice(
  invoiceId: string,
  document: EditedInvoiceType
) {
  const invoiceRef = doc(db, "invoices", invoiceId);
  try {
    await updateDoc(invoiceRef, { ...document });
    return document;
  } catch (e) {
    console.error("Error updating invoice:", e);
    throw new Error("Failed to update invoice to the database.");
  }
}

export async function createDocumentFromFormValues(
  userId: string,
  formValues: FormValues
) {
  try {
    const publicId = await getUniqueId();
    if (publicId)
      return {
        id: publicId,
        userId,
        createdAt: getCurrentDateString(formValues.invoiceDate),
        paymentDue: getPaymentDue(formValues.paymentTerm),
        paymentTerms: getPaymentTerms(formValues.paymentTerm),
        total: getTotal(formValues.items),
        description: formValues.description,
        status: "pending" as paidStatus,
        clientAddress: {
          city: formValues.clientsCity,
          country: formValues.clientsCountry,
          postCode: formValues.clientsPostCode,
          street: formValues.clientsStreet,
        },
        clientEmail: formValues.clientsEmail,
        clientName: formValues.clientsName,
        senderAddress: {
          city: formValues.senderCity,
          country: formValues.senderCountry,
          postCode: formValues.senderPostCode,
          street: formValues.senderStreet,
        },
        items: formValues.items,
      };
  } catch {
    throw new Error("Unable to create ID");
  }
}

export function editDocumentFromFormValues(formValues: FormValues) {
  const document = {
    createdAt: getCurrentDateString(formValues.invoiceDate),
    paymentDue: getPaymentDue(formValues.paymentTerm),
    paymentTerms: getPaymentTerms(formValues.paymentTerm),
    total: getTotal(formValues.items),
    description: formValues.description,
    clientAddress: {
      city: formValues.clientsCity,
      country: formValues.clientsCountry,
      postCode: formValues.clientsPostCode,
      street: formValues.clientsStreet,
    },
    clientEmail: formValues.clientsEmail,
    clientName: formValues.clientsName,
    senderAddress: {
      city: formValues.senderCity,
      country: formValues.senderCountry,
      postCode: formValues.senderPostCode,
      street: formValues.senderStreet,
    },
    items: formValues.items,
  };

  return document;
}

export async function createDraftFromFormValues(
  userId: string,
  formValues: PartialFormValues
) {
  try {
    const publicId = await getUniqueId();
    if (publicId) {
      return {
        userId,
        id: publicId,
        status: "draft" as paidStatus,
        createdAt: getCurrentDateString(formValues.invoiceDate),
        paymentDue: getPaymentDue(formValues.paymentTerm!),
        paymentTerms: getPaymentTerms(formValues.paymentTerm!),
        total: formValues.items?.length ? getTotal(formValues.items) : 0,
        description: formValues.description || "",
        clientAddress: {
          city: formValues.clientsCity || "",
          country: formValues.clientsCountry || "",
          postCode: formValues.clientsPostCode || "",
          street: formValues.clientsStreet || "",
        },
        clientEmail: formValues.clientsEmail || "",
        clientName: formValues.clientsName || "",
        senderAddress: {
          city: formValues.senderCity || "",
          country: formValues.senderCountry || "",
          postCode: formValues.senderPostCode || "",
          street: formValues.senderStreet || "",
        },
        items: formValues.items || [],
      };
    }
  } catch (e) {
    console.log(e);
    throw new Error("Unable to create ID");
  }
}

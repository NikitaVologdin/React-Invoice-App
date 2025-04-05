import {
  THIS_DAY,
  THIS_MONTH,
  THIS_YEAR,
} from "../components/form/date/helpers";
import {
  editDocumentFromFormValues,
  createDocumentFromFormValues,
} from "../utils/writeInvoice";

export const initialValues = {
  senderStreet: "",
  senderCity: "",
  senderPostCode: "",
  senderCountry: "",
  clientsName: "",
  clientsEmail: "",
  clientsStreet: "",
  clientsCity: "",
  clientsPostCode: "",
  clientsCountry: "",
  invoiceDate: [THIS_DAY, THIS_MONTH, THIS_YEAR],
  paymentTerm: "Net 1 Day",
  description: "",
  items: [{ name: "", quantity: 0, price: 0, total: 0 }],
};

export type ItemError = { name?: string; quantity?: string; price?: string };

export type FormErrors = {
  [K in keyof FormValues]?: K extends "items"
    ? string | { [index: number]: ItemError } // Array errors
    : K extends "invoiceDate"
    ? string // Special case for invoiceDate
    : FormValues[K] extends object
    ? FormErrors
    : string;
};

export class ErrorWithId extends Error {
  constructor(message: string, public publicId: string) {
    super(message);
    this.name = "ErrorWithId";
  }
}

export type FormValues = typeof initialValues;
export type PartialFormValues = Partial<FormValues>;

export type EditedInvoiceType = ReturnType<typeof editDocumentFromFormValues>;
export type NewInvoiceType = Awaited<
  ReturnType<typeof createDocumentFromFormValues>
>;

export type paidStatus = "paid" | "pending" | "draft";

export type invoice = {
  userId: string;
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: "draft" | "pending" | "paid";
  senderAddress: address;
  clientAddress: address;
  items: item[];
  total: number;
};

export type address = {
  street: string;
  city: string;
  postCode: string;
  country: string;
};

export type item = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export interface InvoiceState {
  invoices: invoice[];
  loading: boolean;
  error: string | null;
  success: string | null;
  deleted: boolean;
  updated: boolean;
  edited: boolean;
}

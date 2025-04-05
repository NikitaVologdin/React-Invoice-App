import { type invoice as Invoice } from "../types/invoice";
import { dateStringToArrayNumber } from "../components/form/date/helpers";

function termNumberToString(term: number) {
  switch (term) {
    case 1:
      return "Net 1 Day";
    case 7:
      return "Net 7 Days";
    case 14:
      return "Net 14 Days";
    case 30:
      return "Net 30 Days";
    default:
      return "Select Terms";
  }
}

export default function invoiceToFormData(invoice: Invoice) {
  if (!invoice) return;

  return {
    senderStreet: invoice.senderAddress.street,
    senderCity: invoice.senderAddress.city,
    senderPostCode: invoice.senderAddress.postCode,
    senderCountry: invoice.senderAddress.country,
    clientsName: invoice.clientName,
    clientsEmail: invoice.clientEmail,
    clientsStreet: invoice.clientAddress.street,
    clientsCity: invoice.clientAddress.city,
    clientsPostCode: invoice.clientAddress.postCode,
    clientsCountry: invoice.clientAddress.country,
    invoiceDate: dateStringToArrayNumber(invoice.createdAt),
    paymentTerm: termNumberToString(invoice.paymentTerms),
    description: invoice.description,
    items: invoice.items,
  };
}

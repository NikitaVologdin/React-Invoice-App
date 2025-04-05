import { useParams } from "react-router";
import Form from "../components/form/Form";
import GoBack from "../ui/navigation/GoBack";
import { useAppSelector } from "../hooks/redux/hooks";
import { selectInvoices } from "../store/features/invoices/invoicesSlice";
import invoiceToFormData from "../utils/invoiceToFormData";

export default function EditInvoice() {
  const { invoiceId } = useParams();
  const { invoices } = useAppSelector(selectInvoices);
  const invoice = invoices.find((i) => i.id === invoiceId)!;
  const formValues = invoiceToFormData(invoice);

  return (
    <div className="bg-white dark:bg-[#141625]">
      <GoBack href={"../invoices"} />
      <h1 className="font-bold text-2xl leading-8 -tracking-[0.5px] text-[#0C0E16] mb-[22px] mt-[10px] dark:text-white">
        Edit &nbsp;<span className="text-[#888EB0]">#</span>
        {invoiceId?.toUpperCase()}
      </h1>
      <Form mode="edit" invoiceValues={formValues} />
    </div>
  );
}

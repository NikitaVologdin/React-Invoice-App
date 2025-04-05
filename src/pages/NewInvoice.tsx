import Form from "../components/form/Form";
import GoBack from "../ui/navigation/GoBack";

export default function NewInvoice() {
  return (
    <div className="bg-white dark:bg-[#141625]">
      <GoBack href={"../invoices"} />
      <h1 className="font-bold text-2xl leading-8 -tracking-[0.5px] text-[#0C0E16] mb-[22px] mt-[10px] dark:text-white">
        New Invoices
      </h1>
      <Form mode="new" />
    </div>
  );
}

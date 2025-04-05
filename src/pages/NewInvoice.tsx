import Form from "../components/form/Form";
import GoBack from "../ui/navigation/GoBack";

export default function NewInvoice() {
  return (
    <div className="bg-white dark:bg-[#141625] absolute z-0 top-0 bottom-0 left-0 right-0 px-6">
      <GoBack href={"../invoices"} />
      <h1 className="font-bold text-2xl leading-8 -tracking-[0.5px] text-[#0C0E16] mb-[22px] mt-[10px]">
        New Invoices
      </h1>
      <Form mode="new" />
    </div>
  );
}

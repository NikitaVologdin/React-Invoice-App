import NewButton from "../components/form/NewButton";
import Filter from "../components/Filter";

type props = {
  invoicesAmount: number;
};
export default function Nav({ invoicesAmount }: props) {
  return (
    <nav className="mt-[104px] md:mt-[141px] lg:mt-[77px] flex items-center">
      <div className="flex flex-col">
        <h1 className="text-2xl tracking-[-0.75px] md:text-4xl text-[var(--deep-black)] font-bold dark:text-white">
          Invoices
        </h1>
        <p className="mt-1.5 text-base leading-[15px] tracking-[-0.1px] text-[var(--blue-gray)]">
          {invoicesAmount} invoices
        </p>
      </div>
      <div className="ml-auto flex gap-[2.54px]">
        <Filter />
        <NewButton />
      </div>
    </nav>
  );
}

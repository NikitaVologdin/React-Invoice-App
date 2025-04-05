import { useCallback } from "react";
import InvoicesItem from "./InvoicesItem";
import NoInvoices from "../../ui/invoices/NoInvoices";
import { useAppSelector } from "../../hooks/redux/hooks";
import { selectInvoices } from "../../store/features/invoices/invoicesSlice";
import { useRef, useState, useEffect } from "react";
import useScrollToTop from "../../hooks/useScrollToTop";
import { selectFilters } from "../../store/features/filter/filterSlice";
import { filterItem } from "../../types/filter";
import Nav from "../../components/Nav";

export default function Invoices() {
  const { invoices: storeInvoices } = useAppSelector(selectInvoices);
  const [invoices, setInvoices] = useState(storeInvoices);
  const initialInvoicesAmount = useRef(storeInvoices.length);
  const filters = useAppSelector(selectFilters);

  useScrollToTop(
    storeInvoices.length,
    initialInvoicesAmount.current,
    storeInvoices
  );

  const capitalizeFirstLetter = useCallback((val: string) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }, []);

  useEffect(() => {
    if (filters.length) {
      const res = storeInvoices.filter((invoice) => {
        const status = capitalizeFirstLetter(invoice.status);
        return filters.includes(status as filterItem);
      });
      setInvoices(res);
    } else {
      setInvoices(storeInvoices);
    }
  }, [filters, storeInvoices, capitalizeFirstLetter]);

  return (
    <section className="pb-[105px] md:pb-[173]">
      <Nav invoicesAmount={invoices.length} />
      <div className="mt-[32px] md:mt-[55px] lg:mt-[64px] flex flex-col gap-4 items-center">
        {invoices.length ? (
          invoices.map((invoice) => {
            return <InvoicesItem invoice={invoice} key={invoice.id} />;
          })
        ) : (
          <NoInvoices />
        )}
      </div>
    </section>
  );
}

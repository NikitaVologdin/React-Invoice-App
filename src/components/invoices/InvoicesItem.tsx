import { useMediaQuery } from "react-responsive";
import { Link } from "react-router";
import { invoice, paidStatus } from "../../types/invoice";
import Status from "../../ui/invoices/invoice/Status";
import arrowRight from "../../assets/icon-arrow-right.svg";
import formatTotal from "../../utils/formatTotal";

type props = {
  invoice: invoice;
};

function Total({ total }: { total: number }) {
  const formattedTotal = formatTotal(total);

  return (
    <div className="col-start-1 row-start-3 md:col-start-auto md:row-start-auto font-bold -tracking-[0.25px] text-[var(--deep-black) leading-6 mt-[9px] md:mt-0 dark:text-white md:order-4 md:justify-self-center">
      &#163; {formattedTotal}
    </div>
  );
}

export default function InvoicesItem({ invoice }: props) {
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });
  return (
    <Link to={`${invoice.id}`}>
      <div className="relative grid grid-cols-2 md:grid-cols-5 md:grid-rows-1 items-center p-6 md:p-0 md:pl-6 md:py-4 md:pr-12 bg-white rounded-lg drop-shadow-[0px_10px_10px_-10px_rgba(72, 84, 159, 0.1)] dark:bg-[var(--purple-black)] ">
        <div className="col-start-1 row-start-1 md:col-start-auto md:row-start-auto font-bold -tracking-[0.25px] text-[var(--deep-black)] leading-6 dark:text-white">
          <span className="text-[var(--blue-gray)] dark:text-[var(--A07)]">
            #
          </span>
          {invoice.id}
        </div>
        <div className="col-start-1 row-start-2 md:col-start-auto md:row-start-auto text-xs -tracking-[0.1px] text-[var(--blue-gray)] leading-[15px] mt-6 md:mt-0 dark:text-[var(--A05)]">
          {invoice.paymentDue}
        </div>
        <Total total={invoice.total} />
        <div className="col-start-2 row-start-1 md:col-start-auto md:row-start-auto justify-self-end text-xs -tracking-[0.1px] text-[var(--blue-gray)] leading-[15px] dark:text-white md:order-3 md:justify-self-start">
          {invoice.clientName}
        </div>
        <Status
          status={invoice.status as paidStatus}
          className={
            "col-start-2 row-start-2 row-span-2 justify-self-end mt-6 md:mt-0 md:col-start-auto md:row-start-auto md:order-5"
          }
        />
        {isTablet && (
          <img
            src={arrowRight}
            aria-hidden="true"
            alt=""
            width={7}
            height={10}
            className="absolute right-6"
          />
        )}
      </div>
    </Link>
  );
}

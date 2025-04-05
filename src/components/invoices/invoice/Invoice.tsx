import Status from "../../../ui/invoices/invoice/Status";
import InvoiceDetailsItem from "./InvoiceDetailsItem";
import { address, item, paidStatus } from "../../../types/invoice";
import { useMediaQuery } from "react-responsive";
import GoBack from "../../../ui/navigation/GoBack";
import { useLoaderData, useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux/hooks";
import DeleteInvoice from "./DeleteInvoice";
import MarkAsPaid from "./MarkAsPaid";
import { selectInvoices } from "../../../store/features/invoices/invoicesSlice";
import { useEffect, useRef } from "react";
import EditButton from "../../form/EditButton";

function DetailsStatus({ status }: { status: paidStatus }) {
  const isTablet = useMediaQuery({ query: "(min-width: 640px)" });
  const { updated } = useAppSelector(selectInvoices);
  const detailsStatus = useRef(status);

  useEffect(() => {
    if (updated) {
      detailsStatus.current = "paid";
    }
  }, [updated]);

  return (
    <div className="status bg-white rounded-lg p-6 flex items-center justify-between dark:bg-[var(--A03)] mt-[31px] md:justify-start">
      <span className="text-xs -tracking-[0.1px] leading-[15px] text-[#858BB2] md:mr-5">
        Status
      </span>
      <Status status={detailsStatus.current} />
      {isTablet && <DetailsControls className="ml-auto" />}
    </div>
  );
}

function DetailsTitle({
  id,
  description,
}: {
  id: string;
  description: string;
}) {
  return (
    <div className="id font-bold -tracking-[0.25px] text-[var(--deep-black)] leading-6 dark:text-white col-start-1">
      <span className="text-[var(--blue-gray)] dark:text-[var(--A07)]">#</span>
      {id}
      <div className="description text-xs font-medium -tracking-[0.1px] leading-[15px] text-[var(--A07)]">
        {description}
      </div>
    </div>
  );
}

function DetailsSenderAddress({ senderAddress }: { senderAddress: address }) {
  return (
    <div className="address flex flex-col col-start-1 row-start-2 md:col-start-4 md:row-start-1">
      <span className="text-xs font-medium -tracking-[0.1px] leading-[18px] text-[var(--A07)]">
        {senderAddress.street}
      </span>
      <span className="text-xs font-medium -tracking-[0.1px] leading-[18px] text-[var(--A07)]">
        {senderAddress.city}
      </span>
      <span className="text-xs font-medium -tracking-[0.1px] leading-[18px] text-[var(--A07)]">
        {senderAddress.postCode}
      </span>
      <span className="text-xs font-medium -tracking-[0.1px] leading-[18px] text-[var(--A07)]">
        {senderAddress.country}
      </span>
    </div>
  );
}

function DetailsDates({
  createdAt,
  paymentDue,
}: {
  createdAt: string;
  paymentDue: string;
}) {
  return (
    <div className="col-start-1 row-start-3 row-span-2 flex flex-col justify-between md:row-start-2">
      <div className="flex flex-col">
        <span className="text-xs font-medium -tracking-[0.1px] leading-[18px] text-[var(--A07)]">
          Invoice Date
        </span>
        <time
          className="font-bold leading-[15px] -tracking-[0.25px] mt-[13px] col-start-1 text-[var(--A08)] dark:text-white"
          dateTime={createdAt}
        >
          {createdAt}
        </time>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium -tracking-[0.1px] leading-[18px] text-[var(--A07)]">
          Payment Due
        </span>
        <time
          className="font-bold leading-[15px] -tracking-[0.25px] mt-[13px] col-start-1 text-[var(--A08)] dark:text-white"
          dateTime={paymentDue}
        >
          {paymentDue}
        </time>
      </div>
    </div>
  );
}

function DetailsEmail({ clientEmail }: { clientEmail: string }) {
  return (
    <div className="email flex flex-col col-start-1 row-start-5 md:col-start-3 md:row-start-2">
      <span className="text-xs font-medium -tracking-[0.1px] leading-[18px] text-[var(--A07)]">
        Sent to
      </span>
      <strong className="font-bold leading-[15px] -tracking-[0.25px] mt-[13px] col-start-1 row-start-5 text-[var(--A08)] dark:text-white">
        <a href={`mailto:${clientEmail}`}>{clientEmail}</a>
      </strong>
    </div>
  );
}

function DetailsClient({
  clientName,
  clientAddress,
}: {
  clientName: string;
  clientAddress: address;
}) {
  return (
    <div className="client flex flex-col col-start-2 row-start-3 row-span-2 md:col-start-2 md:row-start-2">
      <span className="text-xs font-medium -tracking-[0.1px] leading-[18px] text-[var(--A07)]">
        Bill to
      </span>
      <span className="name font-bold leading-[15px] -tracking-[0.25px] mt-[13px] col-start-1 text-[var(--A08)] dark:text-white">
        {clientName}
      </span>
      <div className="address flex flex-col mt-[7px]">
        <span className="text-xs font-medium -tracking-[0.1px] leading-[18px] text-[var(--A07)]">
          {clientAddress.street}
        </span>
        <span className="text-xs font-medium -tracking-[0.1px] leading-[18px] text-[var(--A07)]">
          {clientAddress.city}
        </span>
        <span className="text-xs font-medium -tracking-[0.1px] leading-[18px] text-[var(--A07)]">
          {clientAddress.postCode}
        </span>
        <span className="text-xs font-medium -tracking-[0.1px] leading-[18px] text-[var(--A07)]">
          {clientAddress.country}
        </span>
      </div>
    </div>
  );
}

function DetailsItems({ items }: { items: item[] }) {
  return (
    <div className="items p-6 bg-[#F9FAFE] flex flex-col gap-6 rounded-t-lg dark:bg-[var(--A04)]">
      {items.map((item, index) => {
        return <InvoiceDetailsItem data={item} key={item.name + index} />;
      })}
    </div>
  );
}

function DetailsTotal({ total }: { total: number }) {
  return (
    <div className="total bg-[#373B53] dark:bg-[var(--A08)] px-6 py-8 flex justify-between rounded-b-lg">
      <span className="text-xs text-white leading-[18px] -tracking-[0.1px] font-regular">
        Grand Total
      </span>
      <span className="text-[2,13333333rem] text-white leading-[18px] -tracking-[0.5px] font-bold">
        £{total}
      </span>
    </div>
  );
}

function DetailsControls({ className }: { className?: string }) {
  const cssClass = className ? className : "";

  return (
    <div
      className={`controls absolute -left-[24px] -right-[24px] bottom-[0px] px-6 py-[21px] flex gap-2 bg-white justify-center md:static md:py-0 md:px-0 ${cssClass} dark:bg-[#1E2139]`}
    >
      <EditButton />
      <DeleteInvoice />
      <MarkAsPaid />
    </div>
  );
}

export default function Invoice() {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const invoice = useLoaderData();
  const { userId } = useParams();

  return (
    <section className="details relative pb-[147px]">
      <GoBack href={`/${userId}/invoices`} />
      <DetailsStatus status={invoice.status} />
      <div className="wrapper bg-white rounded-lg p-6 mt-4 dark:bg-[var(--A03)] grid grid-cols-2 grid-rows-[repeat(6, auto)] gap-y-[31px] md:grid-cols-4 md:grid-rows-[repeat(4,auto)] md:gap-y-[21px]">
        <DetailsTitle id={invoice.id} description={invoice.description} />
        <DetailsSenderAddress senderAddress={invoice.senderAddress} />
        <DetailsDates
          createdAt={invoice.createdAt}
          paymentDue={invoice.paymentDue}
        />
        <DetailsEmail clientEmail={invoice.clientEmail} />
        <DetailsClient
          clientName={invoice.clientName}
          clientAddress={invoice.clientAddress}
        />
        <div className="items-list pt-[38px] col-span-2 row-start-6 md:col-span-4 md:row-start-4">
          <DetailsItems items={invoice.items} />
          <DetailsTotal total={invoice.total} />
        </div>
      </div>
      {isMobile && <DetailsControls />}
    </section>
  );
}

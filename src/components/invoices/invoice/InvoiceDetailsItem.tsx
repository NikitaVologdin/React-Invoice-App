import { item } from "../../../types/invoice";

type props = {
  data: item;
};

export default function InvoiceDetailsItem({ data }: props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <span className="font-bold leading-[15px] -tracking-[0.25px] text-[var(--A08)] dark:text-white">
          {data.name}
        </span>
        <span className="font-bold text-[var(--A07)] leading-[15px] -tracking-[0.25px]">{`${data.quantity} x £ ${data.price}`}</span>
      </div>
      <span className="font-bold leading-[15px] -tracking-[0.25px] text-[var(--A08)] dark:text-white">
        &#163; {data.total}
      </span>
    </div>
  );
}

import { paidStatus } from "../../../types/invoice";

type props = {
  status: paidStatus;
  className?: string;
};

export default function Status({ status, className = "" }: props) {
  const backgroundColors = {
    paid: "bg-[var(--light-green)]",
    pending: "bg-[var(--light-orange)]",
    draft: "bg-[var(--light-grey-black)] dark:bg-[#282B43]",
  };
  const textColors = {
    paid: "text-[var(--green)]",
    pending: "text-[var(--orange)]",
    draft: "text-[#373B53] dark:text-[#DFE3FA]",
  };
  const decorationColors = {
    paid: "bg-[var(--green)]",
    pending: "bg-[var(--orange)]",
    draft: "bg-[#373B53] dark:bg-[#DFE3FA]",
  };

  const background = backgroundColors[status];
  const text = textColors[status];
  const decoration = decorationColors[status];

  return (
    <div
      className={`py-3 inline w-[104px] rounded-md ${className} ${background}`}
    >
      <div className={`flex items-center justify-center gap-2`}>
        <div className={`w-2 h-2 rounded-full ${decoration}`}></div>
        <span
          className={`relative top-0.5 font-bold capitalize leading-[15px] -tracking-[0.25px] ${text}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

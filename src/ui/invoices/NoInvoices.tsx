import empty from "../../assets/illustration-empty.svg";

export default function NoInvoices() {
  return (
    <div className="h-full flex flex-col justify-center max-w-[242px] mt-[102px] md:mt-[154px] lg:mt-[85px]">
      <img src={empty} alt="" width={242} height={200} />
      <h1 className="text-2xl text-[var(--A08)] font-bold mt-[42px] dark:text-white">
        There is nothing here
      </h1>
      <p className="text-[var(--A06)] text-center mt-[23px]">
        Create an invoice by clicking the New button and get started
      </p>
    </div>
  );
}

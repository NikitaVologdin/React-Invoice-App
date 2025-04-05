import RedButton from "../../ui/buttons/RedButton";
import WhiteButton from "../../ui/buttons/WhiteButton";

type props = {
  onConfirm: (status: boolean) => void;
  onCancel: (status: boolean) => void;
};

export default function DeleteInvoiceMessage({ onConfirm, onCancel }: props) {
  return (
    <div className="bg-white px-8 pt-[34px] pb-8 dark:bg-[#1E2139]">
      <strong className="block text-2xl  font-bold -tracking-[0.25px] text-[var(--deep-black)] leading-8 dark:text-white col-start-1 mb-2 md:mb-3">
        Confirm Deletion
      </strong>
      <p className="text-xs font-medium -tracking-[0.1px] leading-[15px] text-[var(--A06)] mb-[22px] md:mb-4 dark:text-[#DFE3FA] mt-3 mb-[14px]">
        Are you sure you want to delete invoice #XM9141? This action cannot be
        undone.
      </p>
      <div className="flex justify-end gap-2">
        <WhiteButton
          onClickHandler={() => {
            onCancel(true);
          }}
        >
          Cancel
        </WhiteButton>
        <RedButton
          onClickHandler={() => {
            onConfirm(true);
          }}
        >
          Delete
        </RedButton>
      </div>
    </div>
  );
}

import { useFormState, useForm } from "react-final-form";
import deleteIcon from "../../../assets/icon-delete.svg";
import { Field } from "react-final-form";
import { useEffect } from "react";

type props = {
  name: string;
  index: number;
  // fields: FieldArrayRenderProps<unknown, HTMLElement>["fields"];
  remove: (name: string, index: number) => void;
};

export default function Item({ name, index, remove }: props) {
  const labelStyle = "flex flex-col gap-[9px]";
  const spanStyle =
    "text-xs leading-[15px] -tracking-[0.1px] text-[#7E88C3] dark:text-[#DFE3FA]";
  const inputStyle =
    "py-[18px] px-[20px] border border-[#DFE3FA] rounded-sm text-base font-bold leading-[15px] -tracking-0.25px text-[#0C0E16] dark:bg-[#1E2139] dark:text-white dark:border-[#252945] focus:border-[#9277FF] focus-visible:border-[#9277FF] focus-visible:outline-none";
  const errorStyle = "text-xs leading-[15px] -tracking-[0.1px] text-rose-400";

  const { values } = useFormState();

  const quantity = parseFloat(values.items?.[index]?.quantity || 0);
  const price = parseFloat(values.items?.[index]?.price || 0);
  const total = quantity * price;
  const form = useForm();

  useEffect(() => {
    form.change(`${name}.total`, total);
  }, [quantity, price, total, form, name]);

  return (
    <div className="item grid grid-cols-1 grid-rows-2 gap-[25px]">
      <Field name={`${name}.name`}>
        {({ input, meta }) => (
          <label className={labelStyle}>
            <div className="flex justify-between">
              <span className={spanStyle}>Item Name</span>
              <span className={errorStyle}>
                {meta.touched && meta.visited && meta.error ? meta.error : ""}
              </span>
            </div>
            <input {...input} type="text" className={inputStyle} />
          </label>
        )}
      </Field>

      <div className="grid grid-cols-[23%_25%_25%_auto] gap-4 relative">
        <Field name={`${name}.quantity`}>
          {({ input, meta }) => (
            <label className={labelStyle}>
              <div className="flex justify-between">
                <span className={spanStyle}>Qty.</span>
                <span className={errorStyle}>
                  {meta.touched && meta.visited && meta.error ? meta.error : ""}
                </span>
              </div>
              <input {...input} type="number" className={inputStyle} min={0} />
            </label>
          )}
        </Field>
        <Field name={`${name}.price`}>
          {({ input, meta }) => (
            <label className={labelStyle}>
              <div className="flex justify-between">
                <span className={spanStyle}>Price</span>
                <span className={errorStyle}>
                  {meta.touched && meta.visited && meta.error ? meta.error : ""}
                </span>
              </div>
              <input {...input} type="number" className={inputStyle} min={0} />
            </label>
          )}
        </Field>
        <Field name={`${name}.total`}>
          {({ input }) => (
            <label className={labelStyle}>
              <span className={spanStyle}>Total</span>
              <div className="h-full flex flex-col justify-center">
                <span
                  className="font-bold leading-15px text-base text-[#888EB0] overflow-scroll"
                  {...input}
                >
                  {total.toFixed(2)}
                </span>
              </div>
            </label>
          )}
        </Field>
        {/* pt-[25px] */}
        <div className="absolute justify-self-end top-7">
          <button
            className="cursor-pointer ml-auto p-4 focus-visible:outline-[#9277FF]"
            onClick={() => {
              form.batch(() => {
                remove("items", index);
              });
            }}
          >
            <span className="sr-only">Delete item</span>
            <img src={deleteIcon} alt="" width={13} height={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

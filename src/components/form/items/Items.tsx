import WhiteButton from "../../../ui/buttons/WhiteButton";
import { FieldArray } from "react-final-form-arrays";
import Item from "./Item";
import { useForm } from "react-final-form";
import { useField } from "react-final-form";
import { useEffect, useState } from "react";

type props = {
  push: (name: string, value: unknown) => void;
  remove: (name: string) => void;
  onSkipValidation: (state: boolean) => void;
};

export default function Items({ push, remove, onSkipValidation }: props) {
  const [error, setError] = useState("");
  const legendStyle =
    "font-bold text-lg leading-8 -tracking-[0.38px] text-[#777F98]";
  const errorStyle = "text-xs leading-[15px] -tracking-[0.1px] text-rose-400";
  const form = useForm();
  const field = useField("items");
  useEffect(() => {
    if (field.input.value.length === 0) {
      setError("Required");
    } else {
      setError("");
    }
  }, [field.input.value.length]);

  return (
    <fieldset className="flex flex-col mt-[69px]">
      <div className="flex justify-between items-center mb-[22px]">
        <legend className={legendStyle}>Item List</legend>
        <span className={errorStyle}>{error ? error : ""}</span>
      </div>
      <div className={"items flex flex-col gap-[49px]"}>
        <FieldArray name="items">
          {({ fields }) => {
            return fields.map((name, index) => {
              return (
                <Item name={name} index={index} remove={remove} key={name} />
              );
            });
          }}
        </FieldArray>

        <WhiteButton
          type="button"
          onClickHandler={() => {
            form.batch(() => {
              onSkipValidation(true);
              push("items", {
                name: "",
                quantity: null,
                price: null,
                total: 0,
              });
            });
            setTimeout(() => {
              onSkipValidation(false);
            }, 0);
          }}
        >
          + Add New Item
        </WhiteButton>
      </div>
    </fieldset>
  );
}

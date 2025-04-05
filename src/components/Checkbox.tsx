import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { addFilter, removeFilter } from "../store/features/filter/filterSlice";
import { useAppDispatch } from "../hooks/redux/hooks";
import { filterItem } from "../types/filter";
import { useAppSelector } from "../hooks/redux/hooks";
import { selectFilters } from "../store/features/filter/filterSlice";

type props = {
  label: filterItem;
};

export default function Checkbox({ label }: props) {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  const [isChecked, setIsChecked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setIsChecked(filters.includes(label));
  }, [filters, label]);

  const handleChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    if (newCheckedState) {
      dispatch(addFilter(label));
    } else {
      dispatch(removeFilter(label));
    }
  };

  return (
    <label
      className="flex gap-[12px] items-center cursor-pointer px-4 py-[7.5px]"
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <div className="relative flex items-center">
        <motion.input
          className="appearance-none w-4 h-4 border-2 border-transparent rounded-sm bg-[var(--A05)]"
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          // onChange={clickHandler}
          animate={{
            borderColor: hovered ? "var(--A01)" : "#7c5dfa00",
          }}
        />
        <AnimatePresence initial={true}>
          {isChecked && (
            <svg
              className="absolute top-[43%] left-[50%] -translate-x-1/2 -translate-y-1/2"
              width="10"
              height="8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M1.5 4.5l2.124 2.124L8.97 1.28"
                stroke="var(--purple)"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{
                  type: "tween",
                  duration: 0.2,
                  ease: isChecked ? "easeOut" : "easeIn",
                }}
              />
            </svg>
          )}
        </AnimatePresence>
      </div>
      <span className="font-bold -tracking-[0.25px] leading-[15px]">
        {label}
      </span>
    </label>
  );
}

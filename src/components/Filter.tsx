import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import arrow from "../assets/icon-arrow-down.svg";
import Checkbox from "./Checkbox";
import { filterItem } from "../types/filter";
import { useOutsideClick } from "../hooks/useOutsideClick";

const data = ["Draft", "Pending", "Paid"] as filterItem[];

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const isTablet = useMediaQuery({ query: "(min-width: 640px)" });

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });

  const dropDownVariants = { fadeOut: { opacity: 0 }, fadeIn: { opacity: 1 } };

  return (
    <div className="relative flex items-center" ref={ref}>
      <button
        className="px-4 py-1.5 flex gap-3 items-center cursor-pointer"
        onClick={toggleOpen}
      >
        <span className="dark:text-white font-bold -tracking-[0.25px]">
          {isTablet ? "Filter by status" : "Filter"}
        </span>
        <motion.img
          src={arrow}
          aria-hidden="true"
          alt=""
          width={8}
          height={4}
          animate={{ rotate: isOpen ? 180 : 0 }}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-14 left-[50%] bg-white rounded-lg px-[8px] py-[13.5px] shadow-md -translate-x-1/2 z-10 dark:bg-[var(--A04)] dark:text-white"
            variants={dropDownVariants}
            initial="fadeOut"
            animate="fadeIn"
            exit="fadeOut"
          >
            <ul>
              {data.map((item: filterItem) => {
                return (
                  <li key={item}>
                    <Checkbox label={item} />
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

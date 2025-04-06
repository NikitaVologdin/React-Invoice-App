import arrow from "../../../assets/icon-arrow-down.svg";
import { motion, AnimatePresence } from "motion/react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hooks/redux/hooks";
import {
  selectTerms,
  setOption,
  setTermsOpen,
} from "../../../store/features/terms/termsSlice";
import { Option } from "../../../types/terms";
import { setCalendarOpen } from "../../../store/features/datePicker/datePickerSlice";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { useRef, useEffect } from "react";
import { FieldInputProps } from "react-final-form";
import { options } from "./options";
import useColorScheme from "../../../hooks/useColorScheme";

type props = {
  input: FieldInputProps<string>;
};

export default function Terms({ input }: props) {
  const { termsOpen, option } = useAppSelector(selectTerms);
  const dispatch = useDispatch();
  const timeoutId = useRef<number | null>(null);
  const optionClass =
    "cursor-pointer font-bold text-base leading-[15px] -tracking-[0.25px] px-5 py-4";
  const { isDark } = useColorScheme();
  const activeClass = useRef("");

  function toggleMenu() {
    if (!termsOpen) {
      dispatch(setTermsOpen(true));
    }

    if (termsOpen) {
      timeoutId.current = window.setTimeout(() => {
        dispatch(setTermsOpen(false));
      }, 100);
    }
    dispatch(setCalendarOpen(false));
  }

  useEffect(() => {
    if (timeoutId.current) {
      return () => {
        clearTimeout(timeoutId.current as number);
      };
    }
  }, []);

  function chooseOption(event: React.MouseEvent<HTMLUListElement, MouseEvent>) {
    const target = event.target as HTMLLIElement;
    const value = target.innerText;
    dispatch(setOption(value as Option));
    input.onChange(value);
    dispatch(setTermsOpen(false));
  }

  const variants = {
    fadeOut: { opacity: 0 },
    fadeIn: { opacity: 1 },
  };

  const ref = useOutsideClick(() => {
    dispatch(setTermsOpen(false));
  });

  useEffect(() => {
    if (termsOpen && isDark) activeClass.current = "#7C5DFA";
    if (termsOpen && !isDark) activeClass.current = "#7C5DFA";
    if (!termsOpen && isDark) activeClass.current = "#252945";
    if (!termsOpen && !isDark) activeClass.current = "#DFE3FA";
  }, [isDark, termsOpen]);

  return (
    <div className="relative" ref={ref}>
      <motion.button
        className={
          "flex items-center justify-between py-[18px] px-[20px] border rounded-sm cursor-pointer w-full hover:border-[#7C5DFA] dark:bg-[#1E2139] dark:text-white focus-visible:outline-[#9277FF]"
        }
        onClick={toggleMenu}
        whileHover={{ borderColor: "#7C5DFA" }}
        style={{ borderColor: activeClass.current }}
        type="button"
      >
        <motion.span
          className="font-bold text-base leading-[15px] -tracking-[0.25px]"
          key={option}
          initial={false}
          animate={{ scale: [0.99, 1.1, 1] }}
          transition={{ duration: 0.4 }}
        >
          {option}
        </motion.span>
        <motion.img
          src={arrow}
          alt=""
          animate={{ rotate: termsOpen ? 180 : 0 }}
        />
      </motion.button>
      <AnimatePresence>
        {termsOpen && (
          <motion.div
            className="absolute top-18 rounded-lg bg-white w-full z-10 dark:bg-[#1E2139] dark:text-white"
            initial="fadeOut"
            animate="fadeIn"
            exit="fadeOut"
            variants={variants}
            transition={{ ease: "easeOut", duration: 0.3 }}
          >
            <ul
              className="divide-y divide-[#DFE3FA] dark:divide-[rgb(20,22,39)]"
              onClick={chooseOption}
            >
              {options.map((option) => {
                return (
                  <motion.li
                    className={optionClass}
                    key={option}
                    whileHover={{ color: "#7C5DFA" }}
                    whileTap={{ color: "#7C5DFA" }}
                    onTap={() => {
                      dispatch(setTermsOpen(false));
                    }}
                  >
                    {option}
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

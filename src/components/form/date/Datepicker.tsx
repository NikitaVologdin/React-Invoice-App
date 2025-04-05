import calendarIcon from "../../../assets/icon-calendar.svg";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Calendar from "./Calendar";
import { CALENDAR_MONTHS } from "./helpers";
import { useAppSelector } from "../../../hooks/redux/hooks";
import {
  selectDatePicker,
  setCalendarOpen,
} from "../../../store/features/datePicker/datePickerSlice";
import { useAppDispatch } from "../../../hooks/redux/hooks";
import { setTermsOpen } from "../../../store/features/terms/termsSlice";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import createCalendar, { THIS_DAY, THIS_MONTH, THIS_YEAR } from "./helpers";
import { DateValue } from "../../../types/date";
import { FieldInputProps } from "react-final-form";
import useColorScheme from "../../../hooks/useColorScheme";

type props = {
  input: FieldInputProps<DateValue>;
};

export default function Datepicker({ input }: props) {
  const [date, setDate] = useState<DateValue>(
    input.value || [THIS_DAY, THIS_MONTH, THIS_YEAR]
  );

  const [calendar, setCalendar] = useState(
    createCalendar(THIS_MONTH, THIS_YEAR)
  );
  const { isDark } = useColorScheme();
  const dateState = useAppSelector(selectDatePicker);
  const dispatch = useAppDispatch();

  const [day, month, year] = date;
  const { calendarOpen } = dateState;

  const activeClass = useRef("");

  const variants = {
    fadeOut: { opacity: 0 },
    fadeIn: { opacity: 1 },
  };

  function handleToggleCalendar() {
    dispatch(setCalendarOpen(!calendarOpen));
    dispatch(setTermsOpen(false));
  }

  const ref = useOutsideClick(() => {
    dispatch(setCalendarOpen(false));
  });

  useEffect(() => {
    if (calendarOpen && isDark) activeClass.current = "#7C5DFA";
    if (calendarOpen && !isDark) activeClass.current = "#7C5DFA";
    if (!calendarOpen && isDark) activeClass.current = "#252945";
    if (!calendarOpen && !isDark) activeClass.current = "#DFE3FA";
  }, [isDark, calendarOpen]);

  useEffect(() => {
    input.onChange(date);
  }, [date, input]);

  return (
    <div className="relative" ref={ref}>
      <motion.button
        className={
          "flex items-center justify-between py-[18px] px-[20px] border rounded-sm cursor-pointer w-full hover:border-[#7C5DFA] dark:bg-[#1E2139] dark:text-white focus-visible:outline-[#9277FF]"
        }
        onClick={handleToggleCalendar}
        whileHover={{ borderColor: "#7C5DFA" }}
        style={{ borderColor: activeClass.current }}
        type="button"
      >
        <motion.span
          className="font-bold text-base leading-[15px] -tracking-[0.25px]"
          key={day}
          initial={false}
          animate={{ scale: [0.99, 1.1, 1] }}
          transition={{ duration: 0.4 }}
        >
          {`${day} ${CALENDAR_MONTHS[month]} ${year}`}
        </motion.span>
        <img src={calendarIcon} alt="" />
      </motion.button>
      <AnimatePresence>
        {calendarOpen && (
          <motion.div
            className="absolute top-18 bg-white z-10 w-full rounded-lg dark:bg-[#252945]"
            initial="fadeOut"
            animate="fadeIn"
            exit="fadeOut"
            variants={variants}
            transition={{ ease: "easeOut" }}
          >
            <Calendar
              date={date}
              setDate={setDate}
              calendar={calendar}
              setCalendar={setCalendar}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

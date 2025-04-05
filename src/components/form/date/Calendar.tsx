import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import left from "../../../assets/icon-arrow-left.svg";
import right from "../../../assets/icon-arrow-right.svg";
import createCalendar, {
  CALENDAR_MONTHS,
  getMonthFirstDay,
  getMonthDays,
} from "./helpers";
import { useAppDispatch } from "../../../hooks/redux/hooks";

import {
  setCalendarOpen,
  // setDate,
} from "../../../store/features/datePicker/datePickerSlice";

type Direction = "forward" | "back";
type Date = [number, number, number];
type props = {
  date: Date;
  setDate: (date: Date) => void;
  calendar: number[];
  setCalendar: (calendar: number[]) => void;
};

export default function Calendar({
  date,
  setDate,
  calendar,
  setCalendar,
}: props) {
  const [day, month, year] = date;

  const firstDay = getMonthFirstDay(month, year);
  const monthDays = getMonthDays(month, year);

  const direction = useRef<Direction>("forward");
  const timeoutId = useRef<number | null>(null);
  const dispatch = useAppDispatch();

  function selectDay(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = event.target as HTMLButtonElement;
    const day = parseInt(target.innerText);
    const nextMonthAtr = target.getAttribute("data-next");
    const prevMonthAtr = target.getAttribute("data-prev");

    if (nextMonthAtr === "true") {
      let next = month + 1;
      if (next > 11) next = 0;
      handleNextMonth();
      return setDate([day, next, year]);
    }

    if (prevMonthAtr === "true") {
      let prev = month - 1;
      if (prev < 0) prev = 11;
      handlePrevMonth();
      return setDate([day, prev, year]);
    }

    setDate([day, month, year]);
    const anotherMonth = nextMonthAtr === "true" || prevMonthAtr === "true";
    timeoutId.current = window.setTimeout(
      () => {
        dispatch(setCalendarOpen(false));
      },
      anotherMonth ? 2200 : 400
    );
  }

  useEffect(() => {
    if (timeoutId.current !== null) {
      return () => {
        window.clearTimeout(timeoutId.current as number);
      };
    }
  }, []);

  function handleNextMonth() {
    const yearLength = CALENDAR_MONTHS.length - 1;
    const next = month + 1;
    direction.current = "forward";
    setDate([1, month, year]);

    if (next > yearLength) {
      setDate([day, 0, year + 1]);
      return;
    }
    setDate([day, next, year]);
  }

  function handlePrevMonth() {
    const prev = month - 1;
    direction.current = "back";
    setDate([1, month, year]);

    if (prev < 0) {
      setDate([1, 11, year - 1]);
      return;
    }
    setDate([day, prev, year]);
  }

  useEffect(() => {
    setCalendar(createCalendar(month, year));
  }, [year, month, setCalendar]);

  const calendarVariants = {
    initial: (direction: Direction) => ({
      x: direction === "forward" ? 500 : -500,
    }),
    exit: (direction: Direction) => ({
      x: direction === "back" ? 500 : -500,
    }),
  };

  useEffect(() => {
    setDate([day, month, year]);
  }, [day, month, year, setCalendar, setDate]);

  return (
    <div className="overflow-x-hidden relative pb-[31px] min-h-[290px]">
      <div className="month flex justify-between items-center px-[16px] pt-[26px] pb-[32px]">
        <button
          className="p-1 flex justify-center items-center cursor-pointer"
          onClick={handlePrevMonth}
          type="button"
        >
          <span className="sr-only">Previous month</span>
          <img src={left} alt="" width={7} height={10} />
        </button>
        <span className="font-bold text-base leading-[15px] -tracking-[0.25px] dark:text-[#DFE3FA]">
          {`${CALENDAR_MONTHS[month]} ${year}`}
        </span>
        <button
          className="p-1 flex justify-center items-center cursor-pointer"
          onClick={handleNextMonth}
          type="button"
        >
          <span className="sr-only">Previous month</span>
          <img src={right} alt="" width={7} height={10} />
        </button>
      </div>
      <AnimatePresence initial={false} mode="sync" custom={direction.current}>
        <motion.div
          className="days grid grid-cols-7 grid-rows-6 absolute left-0 right-0"
          onClick={selectDay}
          variants={calendarVariants}
          custom={direction.current}
          initial="initial"
          animate={{ x: 0, opacity: 1 }}
          exit="exit"
          key={month}
          transition={{
            type: "spring",
            bounce: 0.2,
          }}
        >
          {calendar.map((number: number, index: number) => {
            const isActive = day === number;
            const prevMonth = index + 1 < firstDay;
            const nextMonth = index - firstDay >= monthDays - 1;
            const available = prevMonth || nextMonth ? false : true;
            let colorClass;
            if (available && isActive) colorClass = "text-[#7C5DFA]";
            if (available && !isActive)
              colorClass = "text-[#0C0E16] dark:text-[#DFE3FA]";
            if (!available) {
              colorClass = "text-[#0c0e161e] dark:text-[#59617daa]";
            }
            return (
              <button
                className={`text-center font-bold text-base leading-[15px] -tracking-[0.25px] py-2 ${colorClass} cursor-pointer `}
                key={index}
                data-prev={prevMonth}
                data-next={nextMonth}
                type="button"
              >
                {number}
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

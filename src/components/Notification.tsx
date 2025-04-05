import { motion } from "motion/react";

type props = {
  message: string;
};

const variants = {
  fadeOut: {
    // y: -100,
    opacity: 0,
  },
  fadeIn: {
    // y: 0,
    opacity: 1,
    // scale: 0.98,
  },
};

export default function Notification({ message }: props) {
  return (
    <motion.div
      className={
        "absolute left-1/2 -translate-x-1/2 rounded p-2 md:p-4 text-xs bg-[#9277ff0d] dark:bg-[#1E2139] dark:text-white top-20 md:top-25 lg:top-6"
      }
      role="alert"
      variants={variants}
      initial="fadeOut"
      animate="fadeIn"
      exit="fadeOut"
    >
      {message || "This is awesome notification"}
    </motion.div>
  );
}

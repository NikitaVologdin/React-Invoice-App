import { motion } from "motion/react";

type props = {
  children: React.ReactNode;
  onClickHandler: () => void;
  // className: string;
};
export default function RedButton({ children, onClickHandler }: props) {
  return (
    <motion.button
      className={`bg-[var(--red)] py-4 px-6 max-h-12 rounded-full text-[15px] font-bold -tracking-[0.25px] cursor-pointer text-white flex items-center justify-center`}
      onClick={onClickHandler}
      whileHover={{
        backgroundColor: "#FF9797",
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}

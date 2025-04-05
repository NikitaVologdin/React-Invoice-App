import { motion } from "motion/react";
import { ButtonType } from "../../types/buttons";

type props = {
  children: React.ReactNode;
  onClickHandler?: () => void;
  // className: string;
  type?: ButtonType;
};
export default function PurpleButton({
  children,
  onClickHandler = undefined,
  type,
}: props) {
  return (
    <motion.button
      className={`bg-[#7c5dfa] py-4 px-6 max-h-12 rounded-full text-[15px] font-bold -tracking-[0.25px] cursor-pointer text-white flex items-center justify-center`}
      onClick={onClickHandler}
      whileHover={{ backgroundColor: "#9277FF" }}
      whileTap={{ scale: 0.98 }}
      type={type}
    >
      {children}
    </motion.button>
  );
}

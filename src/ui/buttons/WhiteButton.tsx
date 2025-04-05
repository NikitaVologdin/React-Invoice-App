import { motion } from "motion/react";
import useColorScheme from "../../hooks/useColorScheme";
import { ButtonType } from "../../types/buttons";
type props = {
  children: React.ReactNode;
  onClickHandler?: () => void | undefined;
  // className: string;
  type?: ButtonType;
};
export default function WhiteButton({ children, onClickHandler, type }: props) {
  const { isDark } = useColorScheme();
  return (
    <motion.button
      className={`py-4 px-6 max-h-12 rounded-full text-[15px] font-bold -tracking-[0.25px] cursor-pointer text-[var(--A07)] dark:text-[var(--A05)] flex items-center justify-center`}
      onClick={onClickHandler}
      whileHover={{
        backgroundColor: isDark ? "#FFFFFF" : "#DFE3FA",
      }}
      whileTap={{ scale: 0.98 }}
      style={{ backgroundColor: isDark ? "#252945" : "#F9FAFE" }}
      type={type}
    >
      {children}
    </motion.button>
  );
}

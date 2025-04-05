import { motion } from "motion/react";
import { ButtonType } from "../../types/buttons";
import useColorScheme from "../../hooks/useColorScheme";

type props = {
  children: React.ReactNode;
  onClickHandler: () => void;
  className: string;
  type?: ButtonType;
};
export default function PurpleButton({
  children,
  onClickHandler,
  type,
  className = "",
}: props) {
  const { isDark } = useColorScheme();

  const backgroundClass = isDark ? "bg-[#373B53]" : "bg-[#373B53]";
  const hooverClass = isDark ? "#1E2139" : "#0C0E16";
  const colorClass = isDark ? "text-[#DFE3FA]" : "text-[#888EB0]";

  return (
    <motion.button
      className={`${backgroundClass} ${colorClass} py-4 px-6 max-h-12 rounded-full text-[15px] font-bold -tracking-[0.25px] cursor-pointer dark:text-[#DFE3FA] flex items-center justify-center ${className}`}
      onClick={onClickHandler}
      whileHover={{ backgroundColor: hooverClass }}
      whileTap={{ scale: 0.98 }}
      type={type}
    >
      {children}
    </motion.button>
  );
}

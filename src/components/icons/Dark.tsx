import { AnimatePresence, motion } from "motion/react";
import useColorScheme from "../../hooks/useColorScheme";
import moon from "../../assets/icon-moon.svg";
import sun from "../../assets/icon-sun.svg";

export default function Dark() {
  const { isDark, setIsDark } = useColorScheme();

  const imageVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 },
    transition: { duration: 0.3 },
  };

  function changeDarkHandler() {
    setIsDark(!isDark);
  }

  return (
    <button
      onClick={changeDarkHandler}
      className="cursor-pointer p-4 relative overflow-hidden"
    >
      <span className="sr-only">{`Toggle dark mode`}</span>
      <AnimatePresence>
        <motion.img
          src={isDark ? moon : sun}
          alt={isDark ? "moon" : "sun"}
          width={20}
          height={20}
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          key={isDark ? "dark" : "light"}
          className="absolute inset-0 m-auto"
        />
      </AnimatePresence>
    </button>
  );
}

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, Variants } from "motion/react";
type props = {
  children: React.ReactNode;
  shown: boolean;
  className: string;
  variants: Variants;
  initial: string;
  animate: string;
  exit: string;
  showModal?: boolean;
  backdrop?: boolean;
};

export default function Dialog({
  children,
  shown,
  className,
  variants,
  initial,
  animate,
  exit,
  showModal = true,
  backdrop = false,
}: props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (shown && showModal) {
      return dialogRef.current?.showModal();
    }
    if (shown && !showModal) {
      return dialogRef.current?.show();
    }
    if (!shown) {
      return dialogRef.current?.close();
    }
  }, [shown, showModal]);

  const backdropVariants = {
    fadeOut: { opacity: 0 },
    fadeIn: { opacity: 1 },
  };

  return createPortal(
    <div>
      {backdrop && (
        <motion.div
          variants={backdropVariants}
          initial="fadeOut"
          animate="fadeIn"
          exit="fadeOut"
          className="fixed top-0 bottom-0 left-0 right-0 bg-[#0000006a]"
        />
      )}
      <motion.dialog
        className={className}
        ref={dialogRef}
        variants={variants}
        initial={initial}
        animate={animate}
        exit={exit}
      >
        {children}
      </motion.dialog>
    </div>,
    document.getElementById("root")!
  );
}

import { useMediaQuery } from "react-responsive";
import { AnimatePresence, motion } from "motion/react";
import plus from "../../assets/icon-plus.svg";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/hooks";
import { createPortal } from "react-dom";
import Dialog from "../dialogs/Dialog";
import Form from "./Form";
import { selectForm, setOpenForm } from "../../store/features/form/formSlice";

export default function NewButton() {
  const isTablet = useMediaQuery({ query: "(min-width: 640px)" });
  const dispatch = useAppDispatch();
  const { openForm } = useAppSelector(selectForm);

  function handleOpenForm() {
    dispatch(setOpenForm(true));
  }

  const dialogVariants = {
    close: { x: "-50vw", transition: { duration: 0.2 } },
    open: { x: 0, transition: { type: "spring", bounce: 0.25 } },
  };

  return (
    <Link to={isTablet ? "" : "new"}>
      <motion.button
        className={`bg-[#7c5dfa] py-3 px-4 max-h-12 rounded-full text-[15px] font-bold -tracking-[0.25px] cursor-pointer text-white flex gap-3 items-center`}
        onClick={isTablet ? handleOpenForm : undefined}
        whileHover={{ backgroundColor: "#9277FF" }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="bg-white rounded-full p-[11px]">
          <img src={plus} alt="" width={11} height={11} aria-hidden="true" />
        </div>
        {isTablet ? "New Invoice" : "New"}
      </motion.button>
      {isTablet &&
        createPortal(
          <AnimatePresence>
            {openForm && (
              <Dialog
                shown={openForm}
                className="w-[616px] h-full px-14 pt-[59px] pb-8 absolute bottom-0 top-20 lg:top-0 lg:left-20 rounded-r-[20px] max-h-none dark:bg-[#141625] overflow-y-scroll backdrop:bg-[#0000006a]"
                variants={dialogVariants}
                initial="close"
                animate="open"
                exit="close"
                key={"newForm"}
                showModal={false}
                backdrop={true}
              >
                <Form component={true} mode="new" />
              </Dialog>
            )}
          </AnimatePresence>,
          document.getElementById("root")!
        )}
    </Link>
  );
}

import { useMediaQuery } from "react-responsive";
import { AnimatePresence } from "motion/react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/hooks";
import { createPortal } from "react-dom";
import Dialog from "../dialogs/Dialog";
import Form from "./Form";
import { selectForm, setOpenForm } from "../../store/features/form/formSlice";
import WhiteButton from "../../ui/buttons/WhiteButton";
import { selectInvoices } from "../../store/features/invoices/invoicesSlice";
import invoiceToFormData from "../../utils/invoiceToFormData";
import { useMemo } from "react";

export default function EditButton() {
  const isTablet = useMediaQuery({ query: "(min-width: 640px)" });
  const dispatch = useAppDispatch();
  const { openForm } = useAppSelector(selectForm);

  const { invoiceId } = useParams();
  const { invoices } = useAppSelector(selectInvoices);

  const invoice = invoices.find((i) => i.id === invoiceId)!;

  const memorizedFormValues = useMemo(
    () => invoiceToFormData(invoice),
    [invoice]
  );

  function handleOpenForm() {
    dispatch(setOpenForm(true));
  }

  const dialogVariants = {
    close: { x: "-50vw", transition: { duration: 0.2 } },
    open: { x: 0, transition: { type: "spring", bounce: 0.25 } },
  };

  return (
    <Link to={isTablet ? "" : "edit"}>
      <WhiteButton onClickHandler={isTablet ? handleOpenForm : undefined}>
        Edit
      </WhiteButton>
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
                key={"editForm"}
                showModal={false}
                backdrop={true}
              >
                <Form
                  component={true}
                  mode="edit"
                  invoiceValues={memorizedFormValues}
                />
              </Dialog>
            )}
          </AnimatePresence>,
          document.getElementById("root")!
        )}
    </Link>
  );
}

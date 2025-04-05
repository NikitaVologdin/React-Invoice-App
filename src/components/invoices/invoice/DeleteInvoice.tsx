import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import RedButton from "../../../ui/buttons/RedButton";
import {
  deleteInvoice,
  resetInvoicesState,
  selectInvoices,
} from "../../../store/features/invoices/invoicesSlice";
import { showNotification } from "../../../store/features/notification/notificationSlice";
import Dialog from "../../dialogs/Dialog";
import DeleteInvoiceMessage from "../../dialogs/DeleteInvoiceMessage";
import { AnimatePresence } from "motion/react";

export default function DeleteInvoice() {
  const [dialogShown, setDialogShown] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [canceled, setCanceled] = useState(false);
  const { invoiceId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error, success, deleted } = useAppSelector(selectInvoices);

  useEffect(() => {
    if (success && deleted) {
      navigate(-1);
      dispatch(showNotification(success));
      dispatch(resetInvoicesState());
    }

    if (error) {
      dispatch(showNotification(error));
      dispatch(resetInvoicesState());
    }
  }, [success, error, navigate, dispatch, deleted]);

  useEffect(() => {
    if (dialogShown && confirmed && invoiceId) {
      dispatch(deleteInvoice(invoiceId));
    }
    if (dialogShown && canceled) {
      setDialogShown(false);
      setCanceled(false);
    }
  }, [confirmed, dispatch, invoiceId, dialogShown, canceled]);

  const variants = {
    fadeOut: { opacity: 0 },
    fadeIn: { opacity: 1 },
  };
  const dialogClass =
    "rounded-lg absolute top-1/2 -translate-y-1/2 backdrop:bg-[#0000006a] left-6 right-6 md:left-1/2 transform md:-translate-x-1/2";

  return (
    <>
      <RedButton
        onClickHandler={() => {
          setDialogShown(true);
        }}
      >
        Delete
      </RedButton>
      <AnimatePresence>
        {dialogShown && (
          <Dialog
            shown={dialogShown}
            key={"delete-message"}
            className={dialogClass}
            variants={variants}
            initial="fadeOut"
            animate="fadeIn"
            exit="fadeOut"
          >
            <DeleteInvoiceMessage
              onConfirm={setConfirmed}
              onCancel={setCanceled}
            />
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}

import { useParams } from "react-router-dom";
import PurpleButton from "../../../ui/buttons/PurpleButton";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import {
  resetInvoicesState,
  selectInvoices,
  updateStatus,
} from "../../../store/features/invoices/invoicesSlice";
import { useEffect } from "react";
import { showNotification } from "../../../store/features/notification/notificationSlice";

export default function MarkAsPaid() {
  const { invoiceId } = useParams();
  const dispatch = useAppDispatch();
  const { error, success, updated } = useAppSelector(selectInvoices);

  useEffect(() => {
    if (error) {
      dispatch(showNotification(error));
      dispatch(resetInvoicesState());
    }
    if (success && updated) {
      dispatch(showNotification(success));
      dispatch(resetInvoicesState());
    }
  }, [error, success, dispatch, updated]);

  function markAsPaid() {
    dispatch(updateStatus(invoiceId!));
  }

  return (
    <PurpleButton onClickHandler={markAsPaid} type="button">
      Mark as Paid
    </PurpleButton>
  );
}

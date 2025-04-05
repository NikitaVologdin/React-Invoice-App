import GreyButton from "../../../ui/buttons/GreyButton";
import WhiteButton from "../../../ui/buttons/WhiteButton";
import PurpleButton from "../../../ui/buttons/PurpleButton";
import { setOpenForm } from "../../../store/features/form/formSlice";

import { useMediaQuery } from "react-responsive";
import { useAppDispatch } from "../../../hooks/redux/hooks";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-final-form";
import {
  createDraftFromFormValues,
  writeInvoice,
} from "../../../utils/writeInvoice";
import {
  addInvoice,
  removeInvoice,
} from "../../../store/features/invoices/invoicesSlice";
import { ErrorWithId } from "../../../types/form";
import { showNotification } from "../../../store/features/notification/notificationSlice";

type props = {
  submitForm: () => void;
  component: boolean;
};

export default function NewFormControls({ submitForm, component }: props) {
  const isTablet = useMediaQuery({ query: "(min-width: 640px)" });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm();
  const { userId } = useParams();

  return (
    <div className="py-[22px] flex justify-center md:justify-center gap-2">
      <WhiteButton
        onClickHandler={() => {
          if (isTablet) {
            dispatch(setOpenForm(false));
            return;
          }
          navigate(-1);
        }}
        type="button"
      >
        Cancel
      </WhiteButton>
      <GreyButton
        onClickHandler={async () => {
          const { values } = form.getState();
          try {
            const document = await createDraftFromFormValues(userId!, values);
            dispatch(addInvoice(document));
            if (document) {
              writeInvoice(document.id, document);
            }
            if (!component) {
              navigate(-1);
              return;
            }
            dispatch(setOpenForm(false));
          } catch (e) {
            if (e instanceof ErrorWithId) {
              dispatch(showNotification(e.message));
              dispatch(removeInvoice(e.publicId));
            }
            dispatch(setOpenForm(false));
          }
        }}
        className="ml-auto"
      >
        Save as Draft
      </GreyButton>
      <PurpleButton
        onClickHandler={
          component
            ? () => {
                submitForm();
              }
            : undefined
        }
        type="submit"
      >
        Save Changes
      </PurpleButton>
    </div>
  );
}

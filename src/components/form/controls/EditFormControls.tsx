import WhiteButton from "../../../ui/buttons/WhiteButton";
import PurpleButton from "../../../ui/buttons/PurpleButton";
import { setOpenForm } from "../../../store/features/form/formSlice";

import { useMediaQuery } from "react-responsive";
import { useAppDispatch } from "../../../hooks/redux/hooks";
import { useNavigate } from "react-router";
import BouncingDotsLoader from "../../BouncingDotsLoader";

type props = {
  submitForm: () => void;
  component: boolean;
  loading: boolean;
};

export default function EditFormControls({
  submitForm,
  component,
  loading,
}: props) {
  const isTablet = useMediaQuery({ query: "(min-width: 640px)" });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="py-[22px] flex justify-end gap-2">
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
        {loading ? <BouncingDotsLoader text={"Saving"} /> : "Save Changes"}
      </PurpleButton>
    </div>
  );
}

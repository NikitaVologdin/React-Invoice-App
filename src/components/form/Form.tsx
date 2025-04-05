import { Form as FinalForm, Field } from "react-final-form";
import PaymentTerms from "./terms/Terms";
import Datepicker from "./date/Datepicker";
import Items from "./items/Items";
import arrayMutators from "final-form-arrays";
import { ErrorWithId, FormValues, initialValues } from "../../types/form";
import { validateForm } from "./validateForm";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editDocumentFromFormValues,
  uploadEditedInvoice,
  createDocumentFromFormValues,
  writeInvoice,
} from "../../utils/writeInvoice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/hooks";
import { showNotification } from "../../store/features/notification/notificationSlice";
import {
  addInvoice,
  updateInvoice as updateInvoiceState,
  selectInvoices,
  removeInvoice,
} from "../../store/features/invoices/invoicesSlice";
import NewFormControls from "./controls/NewFormControls";
import EditFormControls from "./controls/EditFormControls";
import { setOpenForm } from "../../store/features/form/formSlice";
import { SubmissionErrors } from "final-form";

type props = {
  component?: boolean;
  mode: "new" | "edit";
  invoiceValues?: FormValues;
};

export default function Form({
  component = false,
  mode,
  invoiceValues = undefined,
}: props) {
  const [skipValidation, setSkipValidation] = useState(false);

  const fieldSetStyle = "flex flex-col gap-[25px]";
  const legendStyle =
    "font-bold leading-[15px] text-base -tracking-[0.25px] text-[#7C5DFA] mb-6";
  const labelStyle = "flex flex-col gap-[9px]";
  const spanStyle =
    "text-xs leading-[15px] -tracking-[0.1px] text-[#7E88C3] dark:text-[#DFE3FA]";
  const errorStyle = "text-xs leading-[15px] -tracking-[0.1px] text-rose-400";
  const inputStyle =
    "py-[18px] px-[20px] border border-[#DFE3FA] rounded-sm text-base font-bold leading-[15px] -tracking-0.25px text-[#0C0E16] dark:bg-[#1E2139] dark:text-white dark:border-[#252945] focus:border-[#9277FF] focus-visible:border-[#9277FF] focus-visible:outline-none";

  const { userId, invoiceId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const invoices = useAppSelector(selectInvoices);

  async function submitForm(
    values: FormValues
  ): Promise<void | SubmissionErrors> {
    if (mode === "edit" && invoiceId) {
      const editedDocument = editDocumentFromFormValues(values);
      const prevDocumentState = invoices.invoices.find(
        (i) => i.id === invoiceId
      )!;
      dispatch(updateInvoiceState({ invoiceId, changes: editedDocument }));
      try {
        await uploadEditedInvoice(invoiceId, editedDocument);
        dispatch(showNotification(`Invoice ${invoiceId} been updated`));
        if (!component) {
          navigate(-1);
          return;
        }
        dispatch(setOpenForm(false));
      } catch (e) {
        dispatch(updateInvoiceState({ invoiceId, changes: prevDocumentState }));
        dispatch(showNotification(e as string));
        dispatch(setOpenForm(false));
      }
    }

    if (mode === "new" && userId) {
      try {
        const document = await createDocumentFromFormValues(userId, values);
        if (document) {
          dispatch(addInvoice(document));
          await writeInvoice(document.id, document);
          dispatch(showNotification(`New invoice been created`));
        }
        if (!component) {
          navigate(-1);
          return;
        }
        dispatch(setOpenForm(false));
      } catch (e) {
        if (e instanceof Error) {
          dispatch(showNotification(e.message));
        }
        if (e instanceof ErrorWithId) {
          dispatch(showNotification(e.message));
          dispatch(removeInvoice(e.publicId));
        }
        dispatch(setOpenForm(false));
      }
    }
  }

  return (
    <FinalForm
      onSubmit={submitForm}
      initialValues={mode === "edit" ? invoiceValues : initialValues}
      mutators={{ ...arrayMutators }}
      // debug={(state) => console.log("state", state)}
      validate={skipValidation ? undefined : validateForm}
      subscription={{
        submitting: true,
        pristine: true,
      }}
      validateOnBlur={true}
      render={({
        handleSubmit,
        form: {
          mutators: { push, remove },
        },
      }) => (
        <form
          className="flex flex-col dark:bg-[#141625]"
          onSubmit={handleSubmit}
        >
          <fieldset className={fieldSetStyle}>
            <legend className={legendStyle}>Bill From</legend>
            <Field name="senderStreet">
              {({ input, meta }) => {
                return (
                  <label className={labelStyle}>
                    <div className="flex justify-between">
                      <span className={spanStyle}>Street Address</span>
                      <span className={errorStyle}>
                        {meta.touched && meta.error ? meta.error : ""}
                      </span>
                    </div>
                    <input {...input} type="text" className={inputStyle} />
                  </label>
                );
              }}
            </Field>
            <Field name="senderCity" type="text">
              {({ input, meta }) => {
                return (
                  <label className={labelStyle}>
                    <div className="flex justify-between">
                      <span className={spanStyle}>City</span>
                      <span className={errorStyle}>
                        {meta.touched && meta.error ? meta.error : ""}
                      </span>
                    </div>
                    <input {...input} type="text" className={inputStyle} />
                  </label>
                );
              }}
            </Field>
            <Field name="senderPostCode">
              {({ input, meta }) => {
                return (
                  <label className={labelStyle}>
                    <div className="flex justify-between">
                      <span className={spanStyle}>Post Code</span>
                      <span className={errorStyle}>
                        {meta.touched && meta.error ? meta.error : ""}
                      </span>
                    </div>
                    <input {...input} type="text" className={inputStyle} />
                  </label>
                );
              }}
            </Field>
            <Field name="senderCountry">
              {({ input, meta }) => {
                return (
                  <label className={labelStyle}>
                    <div className="flex justify-between">
                      <span className={spanStyle}>Country</span>
                      <span className={errorStyle}>
                        {meta.touched && meta.error ? meta.error : ""}
                      </span>
                    </div>
                    <input {...input} type="text" className={inputStyle} />
                  </label>
                );
              }}
            </Field>
          </fieldset>
          <fieldset className={fieldSetStyle + " " + "mt-10"}>
            <legend className={legendStyle}>Bill To</legend>
            <Field name="clientsName">
              {({ input, meta }) => (
                <label className={labelStyle}>
                  <div className="flex justify-between">
                    <span className={spanStyle}>Client’s Name</span>
                    <span className={errorStyle}>
                      {meta.touched && meta.error ? meta.error : ""}
                    </span>
                  </div>
                  <input {...input} type="text" className={inputStyle} />
                </label>
              )}
            </Field>
            <Field name="clientsEmail">
              {({ input, meta }) => (
                <label className={labelStyle}>
                  <div className="flex justify-between">
                    <span className={spanStyle}>Client’s Email</span>
                    <span className={errorStyle}>
                      {meta.touched && meta.error ? meta.error : ""}
                    </span>
                  </div>
                  <input {...input} type="email" className={inputStyle} />
                </label>
              )}
            </Field>
            <Field name="clientsStreet">
              {({ input, meta }) => (
                <label className={labelStyle}>
                  <div className="flex justify-between">
                    <span className={spanStyle}>Street Address</span>
                    <span className={errorStyle}>
                      {meta.touched && meta.error ? meta.error : ""}
                    </span>
                  </div>
                  <input {...input} type="text" className={inputStyle} />
                </label>
              )}
            </Field>
            <Field name="clientsCity">
              {({ input, meta }) => (
                <label className={labelStyle}>
                  <div className="flex justify-between">
                    <span className={spanStyle}>City</span>
                    <span className={errorStyle}>
                      {meta.touched && meta.error ? meta.error : ""}
                    </span>
                  </div>
                  <input {...input} type="text" className={inputStyle} />
                </label>
              )}
            </Field>
            <Field name="clientsPostCode">
              {({ input, meta }) => (
                <label className={labelStyle}>
                  <div className="flex justify-between">
                    <span className={spanStyle}>Post Code</span>
                    <span className={errorStyle}>
                      {meta.touched && meta.error ? meta.error : ""}
                    </span>
                  </div>
                  <input {...input} type="text" className={inputStyle} />
                </label>
              )}
            </Field>
            <Field name="clientsCountry">
              {({ input, meta }) => (
                <label className={labelStyle}>
                  <div className="flex justify-between">
                    <span className={spanStyle}>Country</span>
                    <span className={errorStyle}>
                      {meta.touched && meta.error ? meta.error : ""}
                    </span>
                  </div>
                  <input {...input} type="text" className={inputStyle} />
                </label>
              )}
            </Field>
          </fieldset>
          <div className={fieldSetStyle + " " + "mt-[25px]"}>
            <label className={labelStyle}>
              <span className={spanStyle}>Invoice Date</span>
              <Field name="invoiceDate" component={Datepicker} />
            </label>
            <label className={labelStyle}>
              <span className={spanStyle}>Payment Terms</span>
              <Field name="paymentTerm" component={PaymentTerms} />
            </label>
            <Field name="description">
              {({ input, meta }) => (
                <label className={labelStyle}>
                  <div className="flex justify-between">
                    <span className={spanStyle}>Project Description</span>
                    <span className={errorStyle}>
                      {meta.touched && meta.error ? meta.error : ""}
                    </span>
                  </div>
                  <input {...input} type="text" className={inputStyle} />
                </label>
              )}
            </Field>
          </div>
          <Items
            push={push}
            remove={remove}
            onSkipValidation={setSkipValidation}
          />
          <div className="relative mt-22">
            <div className="absolute -top-16 -left-6 -right-6 h-16 bg-linear-to-b from-transparent to-black/10 md:hidden"></div>
            {mode === "new" ? (
              <NewFormControls
                submitForm={handleSubmit}
                component={component}
              />
            ) : (
              <EditFormControls
                submitForm={handleSubmit}
                component={component}
              />
            )}
          </div>
        </form>
      )}
    />
  );
}

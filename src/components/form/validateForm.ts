import { FormErrors, FormValues, ItemError } from "../../types/form";
import { options } from "./terms/options";

const areNumbers = (value: string) => {
  const regex = /\d/;
  return regex.test(value);
};

export function validateForm(values: FormValues) {
  const errors: FormErrors = {};

  errors.senderStreet = validateString(values.senderStreet, "Address");
  errors.senderCity = validateAlphabetic(values.senderCity);
  errors.senderPostCode = validatePostCode(values.senderPostCode);
  errors.senderCountry = validateAlphabetic(values.senderCountry);
  errors.clientsName = validateName(values.clientsName);
  errors.clientsEmail = validateEmail(values.clientsEmail);
  errors.clientsStreet = validateString(values.clientsStreet, "Address");
  errors.clientsCity = validateAlphabetic(values.clientsCity);
  errors.clientsPostCode = validatePostCode(values.clientsPostCode);
  errors.clientsCountry = validateAlphabetic(values.clientsCountry);
  errors.invoiceDate = validateDate(values.invoiceDate);
  errors.paymentTerm = validateTerm(values.paymentTerm);
  errors.description = validateDescription(values.description);
  const itemsValidation = validateItems(values.items);
  if (itemsValidation) {
    errors.items = itemsValidation;
  }
  // console.log("values", values);
  // console.log("errors", errors);
  return errors;
}

function validateString(value: string, target: string) {
  if (!value) return "Required";
  if (value.length < 5) return `To short ${target}`;
  return undefined;
}

function validateAlphabetic(value: string) {
  if (!value) return "Required";
  if (areNumbers(value)) return "No Numbers";
  return undefined;
}

function validatePostCode(value: string) {
  if (!value) return "Required";
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d-]+$/;

  if (!regex.test(value)) return "Invalid Post Code";
  return undefined;
}

function validateName(value: string) {
  if (!value) return "Required";
  return undefined;
}

function validateEmail(value: string) {
  if (!value) return "Required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return "Invalid Email";
  return undefined;
}

function validateDate(value: number[]) {
  if (!value) return "Required";
  if (!Array.isArray(value) || value.length !== 3) return "Wrong format";
  return undefined;
}

function validateTerm(value: string | null) {
  if (!value) return "Required";
  if (!options.includes(value)) return "Wrong format";
  return undefined;
}

function validateDescription(value: string) {
  if (!value) return "Required";
  return undefined;
}

function validateItems(
  items: FormValues["items"] | undefined
): ItemError[] | string | undefined {
  if (!items || items.length === 0) {
    return "At least one item is required";
  }

  const itemErrors = items.map((item) => {
    const itemError: ItemError = {};
    if (!item.name) itemError.name = "Required";
    if (!item.quantity) itemError.quantity = "Required";
    if (!item.price) itemError.price = "Required";
    return itemError;
  });

  const hasErrors = itemErrors.some((error) => Object.keys(error).length > 0);

  return hasErrors ? itemErrors : undefined;
}

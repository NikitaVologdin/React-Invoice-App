export default function formatTotal(number: number) {
  const string = number.toString();
  const splittedString = string.split(".");
  const integer = splittedString[0];
  let hundreds = splittedString[1];
  const integerArray = integer.split("").reverse();

  if (hundreds && hundreds.split("").length === 1) {
    hundreds += 0;
  }
  const formattedNumber = [];

  for (let i = 0; i < integerArray.length; i++) {
    if (i !== 0 && !(i % 3)) {
      formattedNumber.push(",");
      formattedNumber.push(integerArray[i]);
      continue;
    }
    formattedNumber.push(integerArray[i]);
  }

  if (hundreds) {
    return formattedNumber.reverse().join("") + "." + hundreds;
  }
  return formattedNumber.reverse().join("") + ".00";
}

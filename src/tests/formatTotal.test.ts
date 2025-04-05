import { expect, test, describe } from "vitest";
import formatTotal from "../utils/formatTotal";

describe("formatTotal()", () => {
  test("formats 1800.9 to 1,800.90", () => {
    expect(formatTotal(1800.9)).toBe("1,800.90");
  });
  test("formats 400 to 400.00", () => {
    expect(formatTotal(400)).toBe("400.00");
  });
  test("formats 0 to 0", () => {
    expect(formatTotal(0)).toBe("0.00");
  });
  test("formats 102.04 to 102.04", () => {
    expect(formatTotal(102.04)).toBe("102.04");
  });
});

import { z } from "zod";

// WSDOT date format: "/Date(1753121700000)/" or with offset
export const zWsdotDate = () =>
  z
    .string()
    .refine(
      (v) => v.length >= 19 && v.startsWith("/Date(") && v.endsWith(")/"),
      { message: "Invalid WSDOT date format" }
    )
    .transform((val) => new Date(parseInt(val.slice(6, 19), 10)))
    .or(z.date());

export const zWsdotNullableDate = () => zWsdotDate().nullable();

// WSF Schedule dates
const mmddyyyy = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
const mmddyyyyTime =
  /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})\s+(AM|PM)$/i;

export const zWsfDate = () =>
  z
    .string()
    .regex(mmddyyyy, { message: "Invalid WSF MM/DD/YYYY date" })
    .transform((val) => {
      const match = val.match(mmddyyyy);
      if (!match) return new Date(NaN);
      const [, m, d, y] = match;
      return new Date(Number(y), Number(m) - 1, Number(d));
    })
    .or(z.date());

export const zWsfDateTime = () =>
  z
    .string()
    .regex(mmddyyyyTime, { message: "Invalid WSF datetime" })
    .transform((val) => {
      const match = val.match(mmddyyyyTime);
      if (!match) return new Date(NaN);
      const [, m, d, y, hh, mm, ss, ap] = match;
      const hNum = Number(hh);
      const adjusted =
        ap.toUpperCase() === "PM"
          ? hNum === 12
            ? 12
            : hNum + 12
          : hNum === 12
            ? 0
            : hNum;
      return new Date(
        Number(y),
        Number(m) - 1,
        Number(d),
        adjusted,
        Number(mm),
        Number(ss)
      );
    })
    .or(z.date());

export const zNullableString = () => z.string().nullable();
export const zNullableNumber = () => z.number().nullable();
export const zNullableBoolean = () => z.boolean().nullable();

import z from "zod";

export const DateZodValidator = z.preprocess(
  (val) => {
    if (typeof val === "string" || val instanceof Date) {
      const date = new Date(val);
      return Number.isNaN(date.getTime()) ? undefined : date;
    }
    return undefined;
  },
  z.date()
);
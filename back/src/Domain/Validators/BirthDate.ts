import { type ZodType, z } from "zod"

export function parseBirthDate(): ZodType<Date, any, unknown> {
  const minAge = 14;

  return z.preprocess((val) => {
    if (typeof val === "string" || val instanceof Date) {
      const date = new Date(val)
      if (Number.isNaN(date.getTime())) {
        return z.NEVER; // ou apenas return undefined (mas aqui pode causar o erro)
      }
      return date;
    }
    return z.NEVER;
  }, z.date()
    .refine(date => date < new Date(), {
      message: "A data de nascimento não pode estar no futuro",
    })
    .refine(date => {
      const today = new Date()
      const minBirthDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate())
      return date <= minBirthDate
    }, {
      message: `É necessário ter pelo menos ${minAge} anos`,
    })
  );
}

import * as z from "zod/mini";

const contactFields = {
  nombre: z.string().check(z.trim(), z.minLength(2), z.maxLength(120)),
  email: z.pipe(z.string().check(z.trim()), z.email().check(z.maxLength(180))),
  empresa: z.string().check(z.trim(), z.minLength(1), z.maxLength(180)),
  servicio: z.string().check(z.trim(), z.minLength(1), z.maxLength(120)),
  mensaje: z._default(z.string().check(z.trim(), z.maxLength(3000)), ""),
};

export type ContactFieldName = keyof typeof contactFields;
export const contactSchema = z.object(contactFields);
export type ContactSubmission = z.infer<typeof contactSchema>;

export function isContactFieldValid(name: string, value: string): name is ContactFieldName {
  if (!Object.hasOwn(contactFields, name) || value.trim() === "") return false;
  return contactFields[name as ContactFieldName].safeParse(value).success;
}

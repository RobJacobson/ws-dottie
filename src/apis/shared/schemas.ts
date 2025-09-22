import { z } from "zod";

/**
 * Schema for a list of numbers.
 */
export const numbersListSchema = z.array(z.number());

export type NumbersList = z.infer<typeof numbersListSchema>;

/**
 * Schema for a list of strings.
 */
export const stringsListSchema = z.array(z.string());

export type StringsList = z.infer<typeof stringsListSchema>;

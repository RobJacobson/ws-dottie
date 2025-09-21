import { z } from "zod";

/**
 * GetWeatherInformationExtended input schema
 *
 * Input parameters for getting extended weather information.
 */
export const getWeatherInformationExtendedInputSchema = z.object({});

export type GetWeatherInformationExtendedInput = z.infer<
  typeof getWeatherInformationExtendedInputSchema
>;

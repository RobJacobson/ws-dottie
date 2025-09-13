import { z } from "zod";
import { tollRateSchema } from "./tollRate.zod";

/**
 * TollRates schema
 *
 * Current toll rates and related metadata for WSDOT tolled corridors.
 */
export const tollRatesSchema = z
  .array(tollRateSchema)
  .describe(
    "Current toll rates and related metadata for WSDOT tolled corridors."
  );

/** TollRates type */
export type TollRates = z.infer<typeof tollRatesSchema>;

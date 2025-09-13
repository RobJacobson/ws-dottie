import { z } from "zod";
import { tollTripInfoSchema } from "./tollTripInfo.zod";

/**
 * TollTripInfos schema
 *
 * Array of toll trip info records.
 */
export const tollTripInfosSchema = z
  .array(tollTripInfoSchema)
  .describe("Array of toll trip info records.");

/** TollTripInfos type */
export type TollTripInfos = z.infer<typeof tollTripInfosSchema>;

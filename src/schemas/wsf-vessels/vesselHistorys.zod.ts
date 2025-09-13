import { z } from "zod";
import { vesselHistorySchema } from "./vesselHistory.zod";

/**
 * Array of vessel history records
 *
 * Historical data for vessels in the WSF fleet.
 */
export const vesselHistorysSchema = z
  .array(vesselHistorySchema)
  .describe("Historical data for vessels in the WSF fleet.");

export type VesselHistorys = z.infer<typeof vesselHistorysSchema>;

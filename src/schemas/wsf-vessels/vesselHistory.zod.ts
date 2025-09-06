import { z } from "zod";
import { zWsdotDate } from "@/shared/fetching/validation";

/**
 * Vessel history schema for WSF Vessels API
 *
 * This operation provides vessel history data including departure and arrival information.
 * Based on the WSDOT API documentation for vessel history endpoints.
 */
export const vesselHistorySchema = z.object({
  /** Unique identifier for a vessel. */
  VesselId: z.number().int().describe("Unique identifier for a vessel."),

  /** The name of the vessel. */
  Vessel: z.string().describe("The name of the vessel."),

  /** The departing terminal name. */
  Departing: z.string().describe("The departing terminal name."),

  /** The arriving terminal name. */
  Arriving: z.string().describe("The arriving terminal name."),

  /** The scheduled departure time. */
  ScheduledDepart: zWsdotDate().describe("The scheduled departure time."),

  /** The actual departure time. */
  ActualDepart: zWsdotDate().describe("The actual departure time."),

  /** The estimated arrival time. */
  EstArrival: zWsdotDate().describe("The estimated arrival time."),

  /** The date of the vessel history record. */
  Date: zWsdotDate().describe("The date of the vessel history record."),
});

export type VesselHistory = z.infer<typeof vesselHistorySchema>;

/**
 * Array of vessel history records
 *
 * Historical data for vessels in the WSF fleet.
 */
export const vesselHistoryArraySchema = z
  .array(vesselHistorySchema)
  .describe("Historical data for vessels in the WSF fleet.");

export type VesselHistoryArray = z.infer<typeof vesselHistoryArraySchema>;

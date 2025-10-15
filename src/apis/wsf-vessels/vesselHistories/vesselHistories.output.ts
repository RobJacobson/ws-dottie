import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";

/**
 * VesselHistoryResponse schema
 *
 * Contains vessel history information including departure and arrival details.
 */
export const vesselHistoryResponseSchema = z
  .object({
    /** Unique identifier for a vessel. */
    VesselId: z.number().int().describe("Unique identifier for a vessel."),
    /** The name of the vessel. */
    Vessel: z.string().nullable().describe("The name of the vessel."),
    /** The departing terminal name. */
    Departing: z.string().nullable().describe("The departing terminal name."),
    /** The arriving terminal name. */
    Arriving: z.string().nullable().describe("The arriving terminal name."),
    /** The scheduled departure time. */
    ScheduledDepart: zDotnetDate()
      .nullable()
      .describe("The scheduled departure time."),
    /** The actual departure time. */
    ActualDepart: zDotnetDate()
      .nullable()
      .describe("The actual departure time."),
    /** The estimated arrival time. */
    EstArrival: zDotnetDate()
      .nullable()
      .describe("The estimated arrival time."),
    /** The date of the voyage. */
    Date: zDotnetDate().nullable().describe("The date of the voyage."),
  })
  .describe(
    "Contains vessel history information including departure and arrival details."
  );

export type VesselHistoryResponse = z.infer<typeof vesselHistoryResponseSchema>;

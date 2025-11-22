import { z } from "@/shared/zod";

export const vesselHistorySchema = z
  .object({
    VesselId: z.number().int().describe("Numeric ID of the vessel."),
    Vessel: z.string().nullable().describe("Display name of the vessel."),
    Departing: z
      .string()
      .nullable()
      .describe("Display name of the departing terminal."),
    Arriving: z
      .string()
      .nullable()
      .describe("Display name of the arriving terminal."),
    ScheduledDepart: z.date()
      .nullable()
      .describe("UTC datetime of scheduled departure from origin terminal."),
    ActualDepart: z.date()
      .nullable()
      .describe("UTC datetime of actual departure from origin terminal."),
    EstArrival: z.date()
      .nullable()
      .describe("UTC datetime of estimated arrival at destination terminal."),
    Date: z.date()
      .nullable()
      .describe(
        "UTC datetime indicating the calendar date when this voyage occurred."
      ),
  })
  .describe(
    "Historical vessel voyage record including departure and arrival terminals, scheduled and actual departure times, and estimated arrival times."
  );

export type VesselHistory = z.infer<typeof vesselHistorySchema>;

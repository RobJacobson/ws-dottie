import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod-openapi-init";

/**
 * VesselHistoryResponse schema
 *
 * Contains vessel history information including departure and arrival details.
 */
export const vesselHistorySchema = z
  .object({
    VesselId: z
      .number()
      .int()
      .describe(
        "Unique vessel identifier, as an integer ID. E.g., '1077' for vessel Tacoma. Used to identify which vessel this history record belongs to."
      ),
    Vessel: z
      .string()
      .nullable()
      .describe(
        "Vessel name, as a human-readable description. E.g., 'Tacoma' for vessel 1077, null when vessel name is unavailable. Provides vessel identification for history record display."
      ),
    Departing: z
      .string()
      .nullable()
      .describe(
        "Departing terminal name, as a human-readable description. E.g., 'Bainbridge' for Bainbridge Island terminal, 'Colman' for Colman Dock terminal, null when departing terminal is unavailable. Indicates origin terminal for this voyage leg."
      ),
    Arriving: z
      .string()
      .nullable()
      .describe(
        "Arriving terminal name, as a human-readable description. E.g., 'Colman' for Colman Dock terminal, 'Bainbridge' for Bainbridge Island terminal, null when arriving terminal is unavailable. Indicates destination terminal for this voyage leg."
      ),
    ScheduledDepart: zDotnetDate()
      .nullable()
      .describe(
        "Scheduled departure time from origin terminal, as a UTC datetime. E.g., '2025-09-08T14:00:00.000Z' for scheduled 7:00 AM departure, null when scheduled departure time is unavailable. Used to compare actual vs. scheduled departure times for on-time performance analysis."
      ),
    ActualDepart: zDotnetDate()
      .nullable()
      .describe(
        "Actual departure time from origin terminal, as a UTC datetime. E.g., '2025-09-08T14:24:00.000Z' for actual 7:24 AM departure, null when actual departure time is unavailable. Used for on-time performance analysis and historical voyage tracking."
      ),
    EstArrival: zDotnetDate()
      .nullable()
      .describe(
        "Estimated arrival time at destination terminal, as a UTC datetime. E.g., '2025-09-08T14:56:00.000Z' for estimated 7:56 AM arrival, null when estimated arrival time is unavailable. Provides expected arrival time calculated during voyage for historical tracking."
      ),
    Date: zDotnetDate()
      .nullable()
      .describe(
        "Voyage date, as a UTC datetime. E.g., '2025-09-08T07:00:00.000Z' for voyage on September 1, 2025, null when voyage date is unavailable. Indicates the calendar date when this voyage occurred, used for date-based filtering and historical analysis."
      ),
  })
  .describe(
    "Represents historical vessel voyage information including departure and arrival terminals, scheduled and actual departure times, and estimated arrival times. E.g., vessel Tacoma departing Bainbridge Island at 7:00 AM scheduled (7:24 AM actual) arriving Colman Dock at 7:56 AM on September 1, 2025. Used for historical voyage tracking, on-time performance analysis, and route pattern analysis. Updates as historical data is recorded."
  );

export type VesselHistory = z.infer<typeof vesselHistorySchema>;

import { z } from "zod";

/**
 * GetVesselHistory input schema
 */
export const getVesselHistorySchema = z
  .object({
    VesselName: z
      .string()
      .describe(
        "Vessel name for history query, as a human-readable description. E.g., 'Tacoma' for vessel Tacoma, 'Chelan' for vessel Chelan. Required to filter history records for a specific vessel."
      ),
    DateStart: z
      .string()
      .describe(
        "Start date for history query date range, as a date string. E.g., '2025-09-01' for September 1, 2025. Defines the beginning of the date range for retrieving historical vessel departure and arrival records."
      ),
    DateEnd: z
      .string()
      .describe(
        "End date for history query date range, as a date string. E.g., '2025-09-30' for September 30, 2025. Defines the end of the date range for retrieving historical vessel departure and arrival records."
      ),
  })
  .describe(
    "Filters vessel history records by vessel name and date range, returning departure and arrival details for matching voyages. E.g., vessel Tacoma from September 1-30, 2025 showing departures from Bainbridge and Colman terminals. Use for analyzing vessel operational history, on-time performance, and route patterns."
  );

export type GetVesselHistoryInput = z.infer<typeof getVesselHistorySchema>;

export const getAllVesselHistorySchema = z
  .object({})
  .describe(
    "Retrieves vessel history records for all vessels without filtering, returning departure and arrival details. Use when you need complete historical vessel data across all vessels in the fleet."
  );

export type GetAllVesselHistoryInput = z.infer<
  typeof getAllVesselHistorySchema
>;

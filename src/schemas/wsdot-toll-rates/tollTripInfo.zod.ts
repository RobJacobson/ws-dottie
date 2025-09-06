import { z } from "zod";
import { zWsdotDate } from "@/shared/fetching/validation";

/**
 * TollTripInfo schema
 *
 * Static information and geometry for toll trips.
 */
export const tollTripInfoSchema = z.object({
  /** End location name (nullable) */
  EndLocationName: z
    .string()
    .nullable()
    .describe("End location name (nullable)"),
  /** End milepost */
  EndMilepost: z.number().describe("End milepost"),
  /** WGS84 LineString geometry (string) */
  Geometry: z.string().describe("WGS84 LineString geometry (string)"),
  /** Last modified date (JS Date, nullable) */
  ModifiedDate: zWsdotDate()
    .nullable()
    .describe("Last modified date (JS Date, nullable)"),
  /** Start location name (nullable) */
  StartLocationName: z
    .string()
    .nullable()
    .describe("Start location name (nullable)"),
  /** Start milepost */
  StartMilepost: z.number().describe("Start milepost"),
  /** Travel direction (nullable) */
  TravelDirection: z
    .string()
    .nullable()
    .describe("Travel direction (nullable)"),
  /** Trip identifier (nullable) */
  TripName: z.string().nullable().describe("Trip identifier (nullable)"),
});

/**
 * TollTripInfos schema
 *
 * Array of toll trip info records.
 */
export const tollTripInfosSchema = z
  .array(tollTripInfoSchema)
  .describe("Array of toll trip info records.");

/** TollTripInfo type */
export type TollTripInfo = z.infer<typeof tollTripInfoSchema>;

/** TollTripInfos type */
export type TollTripInfos = z.infer<typeof tollTripInfosSchema>;

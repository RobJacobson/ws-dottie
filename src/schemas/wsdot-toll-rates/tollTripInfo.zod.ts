import { z } from "zod";

import { zWsdotDate } from "@/shared/tanstack";

/**
 * TollTripInfo schema
 *
 * Static information and geometry for toll trips.
 */
export const tollTripInfoSchema = z.object({
  /** End latitude */
  EndLatitude: z.number().describe("End latitude"),
  /** End location name (nullable) */
  EndLocationName: z
    .string()
    .nullable()
    .describe("End location name (nullable)"),
  /** End longitude */
  EndLongitude: z.number().describe("End longitude"),
  /** End milepost */
  EndMilepost: z.number().describe("End milepost"),
  /** WGS84 LineString geometry (string) */
  Geometry: z
    .string()
    .nullable()
    .describe("WGS84 LineString geometry (string)"),
  /** Last modified date (JS Date) */
  ModifiedDate: zWsdotDate().describe("Last modified date (JS Date)"),
  /** Start latitude */
  StartLatitude: z.number().describe("Start latitude"),
  /** Start location name (nullable) */
  StartLocationName: z
    .string()
    .nullable()
    .describe("Start location name (nullable)"),
  /** Start longitude */
  StartLongitude: z.number().describe("Start longitude"),
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

/** TollTripInfo type */
export type TollTripInfo = z.infer<typeof tollTripInfoSchema>;

/**
 * Array of toll trip info records.
 */
export const tollTripInfosSchema = z
  .array(tollTripInfoSchema)
  .describe("Array of toll trip info records.");

export type TollTripInfos = z.infer<typeof tollTripInfosSchema>;

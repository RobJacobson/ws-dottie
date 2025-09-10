import { z } from "zod";

/**
 * TollLocation schema
 *
 * Common location fields shared across toll-related schemas.
 */
export const tollLocationSchema = z.object({
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

/** TollLocation type */
export type TollLocation = z.infer<typeof tollLocationSchema>;

/**
 * @fileoverview WSDOT Toll Rates API Output Schemas
 *
 * This module provides Zod schemas for validating responses from the WSDOT
 * Toll Rates API, which provides current toll rates for high occupancy lanes.
 */

import { z } from "zod";

import { zWsdotDate } from "@/apis/shared";

/**
 * Schema for toll rate information for HOV toll lanes
 *
 * The tolls reported here may not match what is currently displayed on the
 * road signs due to timing issues between WSDOT and the tolling contractor.
 */
export const tollRateSchema = z.object({
  /** Name for the toll trip. */
  TripName: z.string().nullable().describe("Name for the toll trip."),
  /**
   * The computed toll in cents which is sent to the tolling company, may not match what is displayed on the sign due to timing issues, a negative value will be used when toll is not available.
   */
  CurrentToll: z
    .number()
    .describe(
      "The computed toll in cents which is sent to the tolling company, may not match what is displayed on the sign due to timing issues, a negative value will be used when toll is not available."
    ),
  /** Message displayed on the sign in place of a toll. */
  CurrentMessage: z
    .string()
    .nullable()
    .describe("Message displayed on the sign in place of a toll."),
  /** Route the toll applies to. */
  StateRoute: z.string().nullable().describe("Route the toll applies to."),
  /** Travel direction the toll applies to. */
  TravelDirection: z
    .string()
    .nullable()
    .describe("Travel direction the toll applies to."),
  /** The start milepost for a toll trip. */
  StartMilepost: z.number().describe("The start milepost for a toll trip."),
  /** Common name of the start location. */
  StartLocationName: z
    .string()
    .nullable()
    .describe("Common name of the start location."),
  /** Approximate geographical latitude of the start location. */
  StartLatitude: z
    .number()
    .describe("Approximate geographical latitude of the start location."),
  /** Approximate geographical longitude of the start location. */
  StartLongitude: z
    .number()
    .describe("Approximate geographical longitude of the start location."),
  /** The end milepost for a toll trip. */
  EndMilepost: z.number().describe("The end milepost for a toll trip."),
  /** Common name of the end location. */
  EndLocationName: z
    .string()
    .nullable()
    .describe("Common name of the end location."),
  /** Approximate geographical latitude of the end location. */
  EndLatitude: z
    .number()
    .describe("Approximate geographical latitude of the end location."),
  /** Approximate geographical longitude of the end location. */
  EndLongitude: z
    .number()
    .describe("Approximate geographical longitude of the end location."),
  /** Last time updated for this toll trip. */
  TimeUpdated: zWsdotDate().describe("Last time updated for this toll trip."),
});

export type TollRate = z.infer<typeof tollRateSchema>;

/**
 * Schema for TollRatesList - the main response list
 */
export const tollRatesListSchema = z.array(tollRateSchema);

export type TollRatesList = z.infer<typeof tollRatesListSchema>;

/**
 * Schema for trip rate information
 */
export const tripRateSchema = z.object({
  /** Message for the trip rate. */
  Message: z.string().nullable().describe("Message for the trip rate."),
  /** Time when the message was last updated. */
  MessageUpdateTime: zWsdotDate().describe(
    "Time when the message was last updated."
  ),
  /** The toll amount for the trip. */
  Toll: z.number().describe("The toll amount for the trip."),
  /** Name of the trip. */
  TripName: z.string().nullable().describe("Name of the trip."),
});

export type TripRate = z.infer<typeof tripRateSchema>;

/**
 * Schema for TripRatesList - list of trip rates
 */
export const tripRatesListSchema = z.array(tripRateSchema);

export type TripRatesList = z.infer<typeof tripRatesListSchema>;

/**
 * Schema for toll trips container
 */
export const tollTripsSchema = z.object({
  /** Last time the toll trips were updated. */
  LastUpdated: zWsdotDate().describe("Last time the toll trips were updated."),
  /** List of trip rates. */
  Trips: tripRatesListSchema.nullable().describe("List of trip rates."),
  /** Version number of the toll trips data. */
  Version: z.number().describe("Version number of the toll trips data."),
});

export type TollTrips = z.infer<typeof tollTripsSchema>;

/**
 * Schema for TollTripsList - list of toll trips
 */
export const tollTripsListSchema = z.array(tollTripsSchema);

export type TollTripsList = z.infer<typeof tollTripsListSchema>;

/**
 * Schema for toll trip information
 */
export const tollTripInfoSchema = z.object({
  /** End latitude of the trip. */
  EndLatitude: z.number().describe("End latitude of the trip."),
  /** Name of the end location. */
  EndLocationName: z.string().nullable().describe("Name of the end location."),
  /** End longitude of the trip. */
  EndLongitude: z.number().describe("End longitude of the trip."),
  /** End milepost of the trip. */
  EndMilepost: z.number().describe("End milepost of the trip."),
  /** Geometry information for the trip. */
  Geometry: z
    .string()
    .nullable()
    .describe("Geometry information for the trip."),
  /** Date when the trip information was last modified. */
  ModifiedDate: zWsdotDate().describe(
    "Date when the trip information was last modified."
  ),
  /** Start latitude of the trip. */
  StartLatitude: z.number().describe("Start latitude of the trip."),
  /** Name of the start location. */
  StartLocationName: z
    .string()
    .nullable()
    .describe("Name of the start location."),
  /** Start longitude of the trip. */
  StartLongitude: z.number().describe("Start longitude of the trip."),
  /** Start milepost of the trip. */
  StartMilepost: z.number().describe("Start milepost of the trip."),
  /** Direction of travel for the trip. */
  TravelDirection: z
    .string()
    .nullable()
    .describe("Direction of travel for the trip."),
  /** Name of the trip. */
  TripName: z.string().nullable().describe("Name of the trip."),
});

export type TollTripInfo = z.infer<typeof tollTripInfoSchema>;

/**
 * Schema for TollTripInfoList - list of toll trip information
 */
export const tollTripInfoListSchema = z.array(tollTripInfoSchema);

export type TollTripInfoList = z.infer<typeof tollTripInfoListSchema>;

/**
 * Schema for toll trip version information
 */
export const tollTripVersionSchema = z.object({
  /** Timestamp of the version. */
  TimeStamp: zWsdotDate().describe("Timestamp of the version."),
  /** Version number. */
  Version: z.number().describe("Version number."),
});

export type TollTripVersion = z.infer<typeof tollTripVersionSchema>;

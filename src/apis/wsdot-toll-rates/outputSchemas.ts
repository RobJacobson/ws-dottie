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
export const TollRateSchema = z.object({
  TripName: z.string().nullable().describe("Name for the toll trip."),
  CurrentToll: z
    .number()
    .describe(
      "The computed toll in cents which is sent to the tolling company, may not match what is displayed on the sign due to timing issues, a negative value will be used when toll is not available."
    ),
  CurrentMessage: z
    .string()
    .nullable()
    .describe("Message displayed on the sign in place of a toll."),
  StateRoute: z.string().nullable().describe("Route the toll applies to."),
  TravelDirection: z
    .string()
    .nullable()
    .describe("Travel direction the toll applies to."),
  StartMilepost: z.number().describe("The start milepost for a toll trip."),
  StartLocationName: z
    .string()
    .nullable()
    .describe("Common name of the start location."),
  StartLatitude: z
    .number()
    .describe("Approximate geographical latitude of the start location."),
  StartLongitude: z
    .number()
    .describe("Approximate geographical longitude of the start location."),
  EndMilepost: z.number().describe("The end milepost for a toll trip."),
  EndLocationName: z
    .string()
    .nullable()
    .describe("Common name of the end location."),
  EndLatitude: z
    .number()
    .describe("Approximate geographical latitude of the end location."),
  EndLongitude: z
    .number()
    .describe("Approximate geographical longitude of the end location."),
  TimeUpdated: zWsdotDate().describe("Last time updated for this toll trip."),
});

export type TollRate = z.infer<typeof TollRateSchema>;

/**
 * Schema for ArrayOfTollRate - the main response array
 */
export const ArrayOfTollRateSchema = z.array(TollRateSchema);

export type ArrayOfTollRate = z.infer<typeof ArrayOfTollRateSchema>;

/**
 * Schema for trip rate information
 */
export const TripRateSchema = z.object({
  Message: z.string().nullable().describe("Message for the trip rate."),
  MessageUpdateTime: zWsdotDate().describe(
    "Time when the message was last updated."
  ),
  Toll: z.number().describe("The toll amount for the trip."),
  TripName: z.string().nullable().describe("Name of the trip."),
});

export type TripRate = z.infer<typeof TripRateSchema>;

/**
 * Schema for ArrayOfTripRate - array of trip rates
 */
export const ArrayOfTripRateSchema = z.array(TripRateSchema);

export type ArrayOfTripRate = z.infer<typeof ArrayOfTripRateSchema>;

/**
 * Schema for toll trips container
 */
export const TollTripsSchema = z.object({
  LastUpdated: zWsdotDate().describe("Last time the toll trips were updated."),
  Trips: z.array(TripRateSchema).nullable().describe("Array of trip rates."),
  Version: z.number().describe("Version number of the toll trips data."),
});

export type TollTrips = z.infer<typeof TollTripsSchema>;

/**
 * Schema for ArrayOfTollTrips - array of toll trips
 */
export const ArrayOfTollTripsSchema = z.array(TollTripsSchema);

export type ArrayOfTollTrips = z.infer<typeof ArrayOfTollTripsSchema>;

/**
 * Schema for toll trip information
 */
export const TollTripInfoSchema = z.object({
  EndLatitude: z.number().describe("End latitude of the trip."),
  EndLocationName: z.string().nullable().describe("Name of the end location."),
  EndLongitude: z.number().describe("End longitude of the trip."),
  EndMilepost: z.number().describe("End milepost of the trip."),
  Geometry: z
    .string()
    .nullable()
    .describe("Geometry information for the trip."),
  ModifiedDate: zWsdotDate().describe(
    "Date when the trip information was last modified."
  ),
  StartLatitude: z.number().describe("Start latitude of the trip."),
  StartLocationName: z
    .string()
    .nullable()
    .describe("Name of the start location."),
  StartLongitude: z.number().describe("Start longitude of the trip."),
  StartMilepost: z.number().describe("Start milepost of the trip."),
  TravelDirection: z
    .string()
    .nullable()
    .describe("Direction of travel for the trip."),
  TripName: z.string().nullable().describe("Name of the trip."),
});

export type TollTripInfo = z.infer<typeof TollTripInfoSchema>;

/**
 * Schema for ArrayOfTollTripInfo - array of toll trip information
 */
export const ArrayOfTollTripInfoSchema = z.array(TollTripInfoSchema);

export type ArrayOfTollTripInfo = z.infer<typeof ArrayOfTollTripInfoSchema>;

/**
 * Schema for toll trip version information
 */
export const TollTripVersionSchema = z.object({
  TimeStamp: zWsdotDate().describe("Timestamp of the version."),
  Version: z.number().describe("Version number."),
});

export type TollTripVersion = z.infer<typeof TollTripVersionSchema>;

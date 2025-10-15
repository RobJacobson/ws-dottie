import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";

/**
 * Schema for common toll trip information fields
 *
 * Contains common fields for toll trip information including location data and trip details
 */
export const tollTripBaseSchema = z.object({
  /** End latitude of the trip. */
  EndLatitude: z.number().describe("End latitude of the trip."),
  /** Name of the end location. */
  EndLocationName: z.string().nullable().describe("Name of the end location."),
  /** End longitude of the trip. */
  EndLongitude: z.number().describe("End longitude of the trip."),
  /** End milepost of the trip. */
  EndMilepost: z.number().describe("End milepost of the trip."),
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

export type TollTripBase = z.infer<typeof tollTripBaseSchema>;

/**
 * Schema for common toll trip rate information fields
 *
 * Contains common fields for toll trip rates
 */
export const tollTripRateBaseSchema = z.object({
  /** Message for the trip rate. */
  Message: z.string().nullable().describe("Message for the trip rate."),
  /** Time when the message was last updated. */
  MessageUpdateTime: zDotnetDate().describe(
    "Time when the message was last updated."
  ),
  /** The toll amount for the trip. */
  Toll: z.number().describe("The toll amount for the trip."),
  /** Name of the trip. */
  TripName: z.string().nullable().describe("Name of the trip."),
});

export type TollTripRateBase = z.infer<typeof tollTripRateBaseSchema>;

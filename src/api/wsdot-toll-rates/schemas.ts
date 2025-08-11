import { z } from "zod";

import { zNullableString, zWsdotDate } from "@/shared/validation";

export const tollRateSchema = z
  .object({
    CurrentMessage: zNullableString(),
    CurrentToll: z.number(),
    EndLatitude: z.number(),
    EndLocationName: z.string(),
    EndLongitude: z.number(),
    EndMilepost: z.number(),
    StartLatitude: z.number(),
    StartLocationName: z.string(),
    StartLongitude: z.number(),
    StartMilepost: z.number(),
    StateRoute: z.string(),
    TimeUpdated: zWsdotDate(),
    TravelDirection: z.string(),
    TripName: z.string(),
  })
  .catchall(z.unknown());

export const tollRateArraySchema = z.array(tollRateSchema);

export const tollTripInfoSchema = z
  .object({
    EndLatitude: z.number(),
    EndLocationName: z.string(),
    EndLongitude: z.number(),
    EndMilepost: z.number(),
    Geometry: z.string(),
    ModifiedDate: zWsdotDate().nullable(),
    StartLatitude: z.number(),
    StartLocationName: z.string(),
    StartLongitude: z.number(),
    StartMilepost: z.number(),
    TravelDirection: z.string(),
    TripName: z.string(),
  })
  .catchall(z.unknown());

export const tollTripInfoArraySchema = z.array(tollTripInfoSchema);

export const tollTripRateSchema = z
  .object({
    Message: z.string(),
    MessageUpdateTime: zWsdotDate(),
    Toll: z.number(),
    TripName: z.string(),
  })
  .catchall(z.unknown());

export const tollTripRatesSchema = z
  .object({
    LastUpdated: zWsdotDate(),
    Trips: z.array(tollTripRateSchema),
  })
  .catchall(z.unknown());

export type TollRate = z.infer<typeof tollRateSchema>;
export type TollTripInfo = z.infer<typeof tollTripInfoSchema>;
export type TollTripRate = z.infer<typeof tollTripRateSchema>;
export type TollTripRates = z.infer<typeof tollTripRatesSchema>;

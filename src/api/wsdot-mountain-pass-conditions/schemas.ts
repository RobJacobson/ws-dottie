import { z } from "zod";

import { zNullableNumber, zWsdotDate } from "@/shared/validation";

export const travelRestrictionSchema = z
  .object({
    TravelDirection: z.string(),
    RestrictionText: z.string(),
  })
  .catchall(z.unknown());

export const mountainPassConditionSchema = z
  .object({
    DateUpdated: zWsdotDate(),
    ElevationInFeet: z.number(),
    Latitude: z.number(),
    Longitude: z.number(),
    MountainPassId: z.number(),
    MountainPassName: z.string(),
    RestrictionOne: travelRestrictionSchema,
    RestrictionTwo: travelRestrictionSchema,
    RoadCondition: z.string(),
    TemperatureInFahrenheit: zNullableNumber(),
    TravelAdvisoryActive: z.boolean(),
    WeatherCondition: z.string(),
  })
  .catchall(z.unknown());

export const mountainPassConditionArraySchema = z.array(
  mountainPassConditionSchema
);

export type TravelRestriction = z.infer<typeof travelRestrictionSchema>;
export type MountainPassCondition = z.infer<typeof mountainPassConditionSchema>;

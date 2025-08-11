import { z } from "zod";

import { zNullableString, zWsdotDate } from "@/shared/validation";

export const borderCrossingLocationSchema = z
  .object({
    Description: z.string(),
    Direction: zNullableString(),
    Latitude: z.number(),
    Longitude: z.number(),
    MilePost: z.number(),
    RoadName: z.string(),
  })
  .catchall(z.unknown())
  .nullable();

export const borderCrossingDataSchema = z
  .object({
    BorderCrossingLocation: borderCrossingLocationSchema,
    CrossingName: z.string(),
    Time: zWsdotDate(),
    WaitTime: z.number(),
  })
  .catchall(z.unknown());

export const borderCrossingDataArraySchema = z.array(borderCrossingDataSchema);

export type BorderCrossingData = z.infer<typeof borderCrossingDataSchema>;
export type BorderCrossingLocation = z.infer<
  typeof borderCrossingLocationSchema
>;

import { z } from "zod";

import { zNullableString, zWsdotDate } from "@/shared/validation";

export const roadwayLocationSchema = z
  .object({
    Description: zNullableString(),
    Direction: zNullableString(),
    Latitude: z.number(),
    Longitude: z.number(),
    MilePost: z.number(),
    RoadName: z.string(),
  })
  .catchall(z.unknown());

export const highwayAlertSchema = z
  .object({
    AlertID: z.number(),
    County: zNullableString(),
    EndRoadwayLocation: roadwayLocationSchema,
    EndTime: zWsdotDate().nullable(),
    EventCategory: z.string(),
    EventStatus: z.string(),
    ExtendedDescription: z.string(),
    HeadlineDescription: z.string(),
    LastUpdatedTime: zWsdotDate(),
    Priority: z.string(),
    Region: z.string(),
    StartRoadwayLocation: roadwayLocationSchema,
    StartTime: zWsdotDate(),
  })
  .catchall(z.unknown());

export const highwayAlertArraySchema = z.array(highwayAlertSchema);

export type RoadwayLocation = z.infer<typeof roadwayLocationSchema>;
export type HighwayAlert = z.infer<typeof highwayAlertSchema>;

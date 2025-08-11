import { z } from "zod";

import { zNullableString } from "@/shared/validation";

export const cameraLocationSchema = z
  .object({
    Description: zNullableString(),
    Direction: zNullableString(),
    Latitude: z.number(),
    Longitude: z.number(),
    MilePost: z.number(),
    RoadName: z.string(),
  })
  .catchall(z.unknown());

export const cameraSchema = z
  .object({
    CameraID: z.number(),
    CameraLocation: cameraLocationSchema,
    CameraOwner: zNullableString(),
    Description: zNullableString(),
    DisplayLatitude: z.number(),
    DisplayLongitude: z.number(),
    ImageHeight: z.number(),
    ImageURL: z.string(),
    ImageWidth: z.number(),
    IsActive: z.boolean(),
    OwnerURL: zNullableString(),
    Region: z.string(),
    SortOrder: z.number(),
    Title: z.string(),
  })
  .catchall(z.unknown());

export const cameraArraySchema = z.array(cameraSchema);

export const searchCamerasParamsSchema = z
  .object({
    StateRoute: z.string().optional(),
    Region: z.string().optional(),
    StartingMilepost: z.number().optional(),
    EndingMilepost: z.number().optional(),
  })
  .strict();

export type CameraLocation = z.infer<typeof cameraLocationSchema>;
export type Camera = z.infer<typeof cameraSchema>;
export type GetCameraResponse = Camera;
export type SearchCamerasParams = z.infer<typeof searchCamerasParamsSchema>;

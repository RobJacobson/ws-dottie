import { z } from "zod";

// Base schemas for common patterns
export const nullableStringSchema = z.string().nullable();
export const nullableNumberSchema = z.number().nullable();

// WSDOT Highway Cameras schemas
export const cameraLocationSchema = z.object({
  Description: nullableStringSchema,
  Direction: nullableStringSchema,
  Latitude: z.number(),
  Longitude: z.number(),
  MilePost: z.number(),
  RoadName: z.string(),
});

export const cameraSchema = z.object({
  CameraID: z.number(),
  CameraLocation: cameraLocationSchema,
  CameraOwner: nullableStringSchema,
  Description: nullableStringSchema,
  DisplayLatitude: z.number(),
  DisplayLongitude: z.number(),
  ImageHeight: z.number(),
  ImageURL: z.string(),
  ImageWidth: z.number(),
  IsActive: z.boolean(),
  OwnerURL: nullableStringSchema,
  Region: z.string(),
  SortOrder: z.number(),
  Title: z.string(),
});

export const camerasArraySchema = z.array(cameraSchema);

// Export all schemas
export const schemas = {
  cameraLocation: cameraLocationSchema,
  camera: cameraSchema,
  camerasArray: camerasArraySchema,
} as const; 
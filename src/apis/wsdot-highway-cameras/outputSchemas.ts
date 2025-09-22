import { z } from "zod";
import { roadwayLocationSchema } from "../shared/roadwayLocationSchema";

/**
 * Schema for Camera - represents a traffic camera
 */
export const cameraSchema = z.object({
  CameraID: z.number().describe("Unique identifier for the camera."),
  CameraLocation: roadwayLocationSchema
    .nullable()
    .describe("Structure identifying where the camera is located."),
  CameraOwner: z
    .string()
    .nullable()
    .describe("Owner of camera when not WSDOT."),
  Description: z
    .string()
    .nullable()
    .describe("Short description for the camera."),
  DisplayLatitude: z
    .number()
    .describe("Latitude of where to display the camera on a map."),
  DisplayLongitude: z
    .number()
    .describe("Longitude of where to display the camera on a map."),
  ImageHeight: z.number().describe("Pixel height of the image."),
  ImageURL: z
    .string()
    .nullable()
    .describe("Stored location of the camera image."),
  ImageWidth: z.number().describe("Pixel width of the image."),
  IsActive: z
    .boolean()
    .describe("Indicator if the camera is still actively being updated."),
  OwnerURL: z
    .string()
    .nullable()
    .describe("Website for camera owner when not WSDOT."),
  Region: z.string().nullable().describe("WSDOT region which owns the camera."),
  SortOrder: z
    .number()
    .describe(
      "When more than one camera is located in the same area this is order of display."
    ),
  Title: z.string().nullable().describe("Title for the camera."),
});

export type Camera = z.infer<typeof cameraSchema>;

/**
 * Schema for CamerasList - represents a list of traffic cameras
 */
export const camerasListSchema = z.array(cameraSchema);

export type CameraList = z.infer<typeof camerasListSchema>;

// Export types from shared
export type { RoadwayLocation } from "../shared/roadwayLocationSchema";

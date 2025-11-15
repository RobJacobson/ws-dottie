import { roadwayLocationSchema } from "@/apis/shared";
import { z } from "@/shared/zod";

export const cameraSchema = z
  .object({
    CameraID: z.number().describe("Numeric ID of the camera."),
    CameraLocation: roadwayLocationSchema
      .nullable()
      .describe(
        "Roadway location information for camera placement, including route and milepost."
      ),
    CameraOwner: z
      .string()
      .nullable()
      .describe("Organization or agency that owns the camera."),
    Description: z
      .string()
      .nullable()
      .describe(
        "Short descriptive text about the camera's purpose or location."
      ),
    DisplayLatitude: z
      .number()
      .describe("Latitude of the camera display position in decimal degrees."),
    DisplayLongitude: z
      .number()
      .describe("Longitude of the camera display position in decimal degrees."),
    ImageHeight: z.number().describe("Pixel height of the camera image."),
    ImageURL: z
      .string()
      .nullable()
      .describe("URL where the camera image is stored and accessible."),
    ImageWidth: z.number().describe("Pixel width of the camera image."),
    IsActive: z
      .boolean()
      .describe(
        "True if the camera is currently active and being updated; otherwise false."
      ),
    OwnerURL: z
      .string()
      .nullable()
      .describe("Website URL for the camera owner organization."),
    Region: z
      .string()
      .nullable()
      .describe("WSDOT region code that owns the camera."),
    SortOrder: z
      .number()
      .describe(
        "Display sort order; lower values appear first when sorting cameras by location."
      ),
    Title: z.string().nullable().describe("Display name of the camera."),
  })
  .describe(
    "Highway camera information including location data, image URLs, status, ownership, and display metadata."
  );

export type Camera = z.infer<typeof cameraSchema>;

// Export types from shared
export type { RoadwayLocation } from "@/apis/shared";

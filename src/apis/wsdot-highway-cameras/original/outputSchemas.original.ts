import { z } from "zod";
import { roadwayLocationSchema } from "@/apis/shared";

/**
 * Schema for Camera - represents a traffic camera
 *
 * Information about traffic camera.
 */
export const cameraSchema = z
  .object({
    /** Unique identifier for the camera. */
    CameraID: z.number().describe("Unique identifier for the camera."),
    /** Structure identifying where the camera is located. */
    CameraLocation: roadwayLocationSchema
      .nullable()
      .describe("Structure identifying where the camera is located."),
    /** Owner of camera when not WSDOT. */
    CameraOwner: z
      .string()
      .nullable()
      .describe("Owner of camera when not WSDOT."),
    /** Short description for the camera. */
    Description: z
      .string()
      .nullable()
      .describe("Short description for the camera."),
    /** Latitude of where to display the camera on a map. */
    DisplayLatitude: z
      .number()
      .describe("Latitude of where to display the camera on a map."),
    /** Longitude of where to display the camera on a map. */
    DisplayLongitude: z
      .number()
      .describe("Longitude of where to display the camera on a map."),
    /** Pixel height of the image. */
    ImageHeight: z.number().describe("Pixel height of the image."),
    /** Stored location of the camera image. */
    ImageURL: z
      .string()
      .nullable()
      .describe("Stored location of the camera image."),
    /** Pixel width of the image. */
    ImageWidth: z.number().describe("Pixel width of the image."),
    /** Indicator if the camera is still actively being updated. */
    IsActive: z
      .boolean()
      .describe("Indicator if the camera is still actively being updated."),
    /** Website for camera owner when not WSDOT. */
    OwnerURL: z
      .string()
      .nullable()
      .describe("Website for camera owner when not WSDOT."),
    /** WSDOT region which owns the camera. */
    Region: z
      .enum(["ER", "NC", "NW", "OL", "OS", "SC", "SW", "WA"])
      .nullable()
      .describe("WSDOT region which owns the camera."),
    /**
     * When more than one camera is located in the same area this is order of display.
     */
    SortOrder: z
      .number()
      .describe(
        "When more than one camera is located in the same area this is order of display."
      ),
    /** Title for the camera. */
    Title: z.string().nullable().describe("Title for the camera."),
  })
  .describe("Information about traffic camera.");

export type Camera = z.infer<typeof cameraSchema>;

/**
 * Schema for CamerasList - represents a list of traffic cameras
 *
 * Provides list of traffic cameras. Coverage Area: Statewide.
 */
export const camerasListSchema = z
  .array(cameraSchema)
  .describe("Provides list of traffic cameras. Coverage Area: Statewide.");

export type CameraList = z.infer<typeof camerasListSchema>;

// Export types from shared
export type { RoadwayLocation } from "@/apis/shared";

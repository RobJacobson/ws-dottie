import { z } from "zod";
import { roadwayLocationSchema } from "@/apis/shared";

/**
 * Schema for Camera - represents a traffic camera
 *
 * Information about traffic camera.
 */
export const cameraSchema = z
  .object({
    /** Unique identifier for camera. */
    CameraID: z.number().describe("Unique identifier for camera."),
    /** Structure identifying where camera is located. */
    CameraLocation: roadwayLocationSchema
      .nullable()
      .describe("Structure identifying where camera is located."),
    /** Owner of camera when not WSDOT. */
    CameraOwner: z
      .string()
      .nullable()
      .describe("Owner of camera when not WSDOT."),
    /** Short description for camera. */
    Description: z
      .string()
      .nullable()
      .describe("Short description for camera."),
    /** Latitude of where to display camera on a map. */
    DisplayLatitude: z
      .number()
      .describe("Latitude of where to display camera on a map."),
    /** Longitude of where to display camera on a map. */
    DisplayLongitude: z
      .number()
      .describe("Longitude of where to display camera on a map."),
    /** Pixel height of image. */
    ImageHeight: z.number().describe("Pixel height of image."),
    /** Stored location of camera image. */
    ImageURL: z
      .string()
      .nullable()
      .describe("Stored location of camera image."),
    /** Pixel width of image. */
    ImageWidth: z.number().describe("Pixel width of image."),
    /** Indicator if camera is still actively being updated. */
    IsActive: z
      .boolean()
      .describe("Indicator if camera is still actively being updated."),
    /** Website for camera owner when not WSDOT. */
    OwnerURL: z
      .string()
      .nullable()
      .describe("Website for camera owner when not WSDOT."),
    /** WSDOT region which owns camera. */
    Region: z
      .string()
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
    /** Title for camera. */
    Title: z.string().nullable().describe("Title for camera."),
  })
  .describe("Information about traffic camera.");

export type Camera = z.infer<typeof cameraSchema>;

// Export types from shared
export type { RoadwayLocation } from "@/apis/shared";

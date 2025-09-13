import { z } from "zod";
import { roadwayLocationSchema } from "@/schemas/shared/roadwayLocation.zod";

/**
 * Camera schema
 *
 * Information about traffic camera.
 */
export const cameraSchema = z
  .object({
    /** Unique identifier for the camera */
    CameraID: z.number().int().describe("Unique identifier for the camera"),
    /** Structure identifying where the camera is located */
    CameraLocation: roadwayLocationSchema
      .nullable()
      .describe("Structure identifying where the camera is located"),
    /** Owner of camera when not WSDOT */
    CameraOwner: z
      .string()
      .nullable()
      .describe("Owner of camera when not WSDOT"),
    /** Short description for the camera */
    Description: z
      .string()
      .nullable()
      .describe("Short description for the camera"),
    /** Latitude of where to display the camera on a map */
    DisplayLatitude: z
      .number()
      .describe("Latitude of where to display the camera on a map"),
    /** Longitude of where to display the camera on a map */
    DisplayLongitude: z
      .number()
      .describe("Longitude of where to display the camera on a map"),
    /** Pixel height of the image */
    ImageHeight: z.number().int().describe("Pixel height of the image"),
    /** Stored location of the camera image */
    ImageURL: z
      .string()
      .nullable()
      .describe("Stored location of the camera image"),
    /** Pixel width of the image */
    ImageWidth: z.number().int().describe("Pixel width of the image"),
    /** Whether the camera is active */
    IsActive: z.boolean().describe("Whether the camera is active"),
    /** URL of the camera owner */
    OwnerURL: z.string().nullable().describe("URL of the camera owner"),
    /** WSDOT Region which entered the alert, valid values: ER - Eastern, NC - North Central, NW - Northwest, OL - Olympic, OS - Olympic South, SC - South Central, SW - Southwest, WA - Washington Aviation. */
    Region: z
      .enum(["ER", "NC", "NW", "OL", "OS", "SC", "SW", "WA"])
      .nullable()
      .describe(
        "WSDOT Region which entered the alert, valid values: ER - Eastern, NC - North Central, NW - Northwest, OL - Olympic, OS - Olympic South, SC - South Central, SW - Southwest, WA - Washington Aviation."
      ),
    /** Sort order for display */
    SortOrder: z.number().int().describe("Sort order for display"),
    /** Title of the camera */
    Title: z.string().nullable().describe("Title of the camera"),
  })
  .describe("Information about traffic camera.");

/** Camera type */
export type Camera = z.infer<typeof cameraSchema>;

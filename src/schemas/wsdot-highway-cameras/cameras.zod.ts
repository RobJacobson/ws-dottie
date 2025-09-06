import { z } from "zod";
import { zLatitude, zLongitude } from "@/shared/fetching/validation";
import { roadwayLocationSchema } from "@/schemas/shared/roadwayLocation.zod";

/**
 * Camera schema
 *
 * Information about traffic camera.
 */
export const cameraSchema = z
  .object({
    /** Unique identifier for the camera */
    CameraID: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the camera"),
    /** WSDOT Region which entered the alert, valid values: EA - Eastern, NC - North Central, NW - Northwest, OL - Olympic, SC - South Central, SW - Southwest. */
    Region: z
      .enum(["EA", "NC", "NW", "OL", "SC", "SW"])
      .describe(
        "WSDOT Region which entered the alert, valid values: EA - Eastern, NC - North Central, NW - Northwest, OL - Olympic, SC - South Central, SW - Southwest."
      ),
    /** Structure identifying where the camera is located */
    CameraLocation: roadwayLocationSchema.describe(
      "Structure identifying where the camera is located"
    ),
    /** Latitude of where to display the camera on a map */
    DisplayLatitude: zLatitude().describe(
      "Latitude of where to display the camera on a map"
    ),
    /** Longitude of where to display the camera on a map */
    DisplayLongitude: zLongitude().describe(
      "Longitude of where to display the camera on a map"
    ),
    /** Title of the camera */
    Title: z.string().describe("Title of the camera"),
    /** Short description for the camera */
    Description: z.string().describe("Short description for the camera"),
    /** Stored location of the camera image */
    ImageURL: z.string().describe("Stored location of the camera image"),
    /** Owner of camera when not WSDOT */
    CameraOwner: z.string().describe("Owner of camera when not WSDOT"),
    /** URL of the camera owner */
    OwnerURL: z.string().describe("URL of the camera owner"),
    /** Pixel width of the image */
    ImageWidth: z
      .number()
      .int()
      .positive()
      .describe("Pixel width of the image"),
    /** Pixel height of the image */
    ImageHeight: z
      .number()
      .int()
      .positive()
      .describe("Pixel height of the image"),
    /** Whether the camera is active */
    IsActive: z.boolean().describe("Whether the camera is active"),
    /** Sort order for display */
    SortOrder: z.number().int().describe("Sort order for display"),
  })
  .describe("Information about traffic camera.");

/**
 * Cameras schema
 *
 * Coverage Area: Statewide. Provides access to the camera images that appear on our Traffic pages. Currently only supports snap shots (not full video). The available cameras does not change very often.
 */
export const camerasSchema = z
  .array(cameraSchema)
  .describe(
    "Coverage Area: Statewide. Provides access to the camera images that appear on our Traffic pages. Currently only supports snap shots (not full video). The available cameras does not change very often."
  );

/** Camera type */
export type Camera = z.infer<typeof cameraSchema>;

/** Cameras type */
export type Cameras = z.infer<typeof camerasSchema>;

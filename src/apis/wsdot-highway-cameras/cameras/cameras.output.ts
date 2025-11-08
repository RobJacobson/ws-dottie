import { roadwayLocationSchema } from "@/apis/shared";
import { z } from "@/shared/zod";

/**
 * Schema for Camera - represents a traffic camera
 *
 * Information about traffic camera.
 */
export const cameraSchema = z
  .object({
    CameraID: z
      .number()
      .describe(
        "Unique camera identifier, as an integer ID. E.g., '9818' for Anacortes Airport Fuel Pump camera, '8216' for Arlington Municipal Airport Northwest camera, '9822' for Auburn Municipal Airport West camera. Used as primary key for camera lookups and camera identification."
      ),
    CameraLocation: roadwayLocationSchema
      .nullable()
      .describe(
        "Roadway location information for camera placement, as a roadway location object. E.g., Airports route at milepost 1 with direction W for Anacortes Airport camera, null when location data is unavailable. Provides route and milepost information for camera positioning."
      ),
    CameraOwner: z
      .string()
      .nullable()
      .describe(
        "Organization or agency that owns camera, as an owner name. E.g., 'WSDOT Aviation' for airport cameras, null when camera is owned by WSDOT Highway division. Used to identify camera ownership and attribution."
      ),
    Description: z
      .string()
      .nullable()
      .describe(
        "Short descriptive text about camera, as a human-readable description. E.g., null when description is not provided. Provides additional context about camera purpose or location."
      ),
    DisplayLatitude: z
      .number()
      .describe(
        "GPS latitude coordinate for camera display position on map, in decimal degrees. E.g., '48.498333' for Anacortes Airport cameras, '48.1675' for Arlington Municipal Airport cameras."
      ),
    DisplayLongitude: z
      .number()
      .describe(
        "GPS longitude coordinate for camera display position on map, in decimal degrees. E.g., '-122.6625' for Anacortes Airport cameras, '-122.1583' for Arlington Municipal Airport cameras."
      ),
    ImageHeight: z
      .number()
      .describe(
        "Pixel height of camera image, as pixels. E.g., '208' for Anacortes Airport cameras, '204' for Arlington and Auburn cameras. Used for image display sizing and aspect ratio calculations."
      ),
    ImageURL: z
      .string()
      .nullable()
      .describe(
        "URL location where camera image is stored and accessible, as an image URL. E.g., 'https://images.wsdot.wa.gov/airports/anafuel.jpg' for Anacortes Airport Fuel Pump camera, 'https://images.wsdot.wa.gov/airports/arlwest.jpg' for Arlington Municipal Airport Northwest camera, null when image URL is unavailable. Used to retrieve and display camera feed images."
      ),
    ImageWidth: z
      .number()
      .describe(
        "Pixel width of camera image, as pixels. E.g., '352' for all airport cameras. Used for image display sizing and aspect ratio calculations."
      ),
    IsActive: z
      .boolean()
      .describe(
        "Indicator whether camera is currently active and being updated, as a boolean. E.g., true for active cameras like Anacortes Airport cameras, false when camera feed is inactive or discontinued. Used to determine if camera images are available and current."
      ),
    OwnerURL: z
      .string()
      .nullable()
      .describe(
        "Website URL for camera owner organization, as a URL. E.g., 'https://wsdot.wa.gov/travel/aviation/airports-list/anacortes' for WSDOT Aviation cameras, null when camera is owned by WSDOT Highway division. Used for attribution and owner information links."
      ),
    Region: z
      .string()
      .nullable()
      .describe(
        "WSDOT region identifier that owns camera, as a region code. E.g., 'WA' for Washington state cameras, null when region is not specified. Used for regional camera filtering and organization."
      ),
    SortOrder: z
      .number()
      .describe(
        "Preferred display order when multiple cameras are in same area, as an integer. E.g., '5300' for airport cameras in same location. Lower values appear first when sorting cameras by location. Used for camera grouping and display ordering."
      ),
    Title: z
      .string()
      .nullable()
      .describe(
        "Human-readable title for camera, as a camera name. E.g., 'Anacortes Airport Fuel Pump' for camera 9818, 'Arlington Municipal Airport Northwest' for camera 8216, 'Auburn Municipal Airport West' for camera 9822, null when title is unavailable. Used for camera identification and display labels."
      ),
  })
  .describe(
    "Represents highway camera information including location data, image URLs, status, ownership, and display metadata. E.g., Anacortes Airport Fuel Pump camera (ID 9818) at location 48.498333, -122.6625 with image URL https://images.wsdot.wa.gov/airports/anafuel.jpg. Used for traffic monitoring, road condition visibility, and camera feed access. Images update periodically to provide current visual conditions."
  );

export type Camera = z.infer<typeof cameraSchema>;

// Export types from shared
export type { RoadwayLocation } from "@/apis/shared";

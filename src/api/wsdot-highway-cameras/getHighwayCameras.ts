import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zLatitude, zLongitude, zNullableString } from "@/shared/validation";

// ============================================================================
// CONSTANTS
// ============================================================================

const ENDPOINT =
  "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/GetCamerasAsJson";

// ============================================================================
// API FUNCTION
// ============================================================================

/**
 * Get all highway cameras
 *
 * Returns all available highway cameras from the WSDOT Highway Cameras API.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing all camera data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const cameras = await getHighwayCameras({});
 * console.log(cameras[0].Title); // "I-5 @ NE 85th St"
 * ```
 */
export const getHighwayCameras = async (
  params: GetHighwayCamerasParams = {}
): Promise<Camera[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getHighwayCamerasParamsSchema,
      output: cameraArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

// No input parameters currently needed for getHighwayCameras
// This schema represents an empty parameter object for consistency
export const getHighwayCamerasParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting all highway cameras. The API returns all available highway cameras across Washington State."
  );

export type GetHighwayCamerasParams = z.infer<
  typeof getHighwayCamerasParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const cameraLocationSchema = z
  .object({
    Description: zNullableString().describe(
      "Human-readable description of the camera location providing context about where the camera is positioned. May be null if no descriptive information is available. Examples include 'Northbound lanes', 'Bridge approach', 'Tunnel entrance', 'Interchange with SR 520', or 'Mountain pass overlook'."
    ),

    Direction: zNullableString().describe(
      "Direction of travel indicator for the camera location. May be null if direction information is not applicable or not available. Examples include 'Northbound', 'Southbound', 'Eastbound', 'Westbound', 'Both Directions', 'All Lanes', or 'Eastbound and Westbound'."
    ),

    Latitude: zLatitude().describe(
      "Latitude coordinate of the camera location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the traffic camera. Essential for GPS navigation and geographic information systems."
    ),

    Longitude: zLongitude().describe(
      "Longitude coordinate of the camera location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the traffic camera. Essential for GPS navigation and geographic information systems."
    ),

    MilePost: z
      .number()
      .describe(
        "Milepost marker indicating the distance along the highway or road where the camera is located. This is a standard highway reference point used by transportation departments for location identification and maintenance purposes."
      ),

    RoadName: z
      .string()
      .describe(
        "Name of the highway or road where the camera is located. Examples include 'I-5', 'SR 520', 'US-2', 'I-90', or 'SR 9'. This field helps users identify which roadway the camera monitors."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Geographic and descriptive information about a camera location where traffic monitoring occurs. Contains coordinates, road information, and descriptive details that help identify and locate the specific camera point."
  );

export const cameraSchema = z
  .object({
    CameraID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier assigned to this highway camera by the WSDOT system. This ID serves as a permanent, unique reference for the camera across all WSDOT systems and can be used for tracking, reporting, and data correlation purposes."
      ),

    CameraLocation: cameraLocationSchema.describe(
      "Detailed location information for the camera including coordinates, road details, and descriptive text. This object provides comprehensive geographic context for the camera position."
    ),

    CameraOwner: zNullableString().describe(
      "Organization or entity responsible for operating and maintaining the camera. May be null if ownership information is not available or not applicable. Examples include 'WSDOT', 'City of Seattle', 'King County', or 'Private Contractor'."
    ),

    Description: zNullableString().describe(
      "Detailed description of the camera's purpose, coverage area, or special features. May be null if no descriptive information is available. Examples include 'Traffic monitoring at major intersection', 'Weather monitoring in mountain pass', or 'Construction zone surveillance'."
    ),

    DisplayLatitude: zLatitude().describe(
      "Latitude coordinate used for display purposes in mapping applications. This coordinate may be slightly adjusted from the actual camera position for better visual representation or to align with specific mapping systems."
    ),

    DisplayLongitude: zLongitude().describe(
      "Longitude coordinate used for display purposes in mapping applications. This coordinate may be slightly adjusted from the actual camera position for better visual representation or to align with specific mapping systems."
    ),

    ImageHeight: z
      .number()
      .int()
      .min(0)
      .describe(
        "Height of the camera image in pixels. This field indicates the vertical resolution of the traffic camera feed and helps applications properly size and display the camera images. May be 0 for cameras that are temporarily offline or have no image data available."
      ),

    ImageURL: z
      .string()
      .url()
      .describe(
        "URL endpoint for accessing the live or recent traffic camera image. This field provides the direct link to the camera feed that can be used by applications to display real-time traffic conditions."
      ),

    ImageWidth: z
      .number()
      .int()
      .min(0)
      .describe(
        "Width of the camera image in pixels. This field indicates the horizontal resolution of the traffic camera feed and helps applications properly size and display the camera images. May be 0 for cameras that are temporarily offline or have no image data available."
      ),

    IsActive: z
      .boolean()
      .describe(
        "Indicates whether the camera is currently active and providing live feeds. True means the camera is operational and accessible, False means the camera is temporarily offline, under maintenance, or not available."
      ),

    OwnerURL: zNullableString().describe(
      "URL to the website or contact information for the camera owner. May be null if no owner website is available. This field provides additional information about who operates the camera and how to contact them."
    ),

    Region: z
      .string()
      .describe(
        "Geographic region of Washington State where the camera is located. Examples include 'Northwest', 'North Central', 'South Central', 'Southwest', 'Eastern', 'Olympic', 'Olympic South', or 'Washington'. This field helps users understand the general area where the camera operates."
      ),

    SortOrder: z
      .number()
      .int()
      .describe(
        "Numeric value used to determine the display order of cameras in listings and applications. Lower numbers typically appear first, helping organize cameras in a logical sequence for user interfaces."
      ),

    Title: z
      .string()
      .describe(
        "Human-readable name for the highway camera that provides quick identification. Examples include 'I-5 @ NE 85th St', 'SR 520 Floating Bridge', 'I-90 Snoqualmie Pass', or 'US-2 Stevens Pass'. This field is the primary display name used in applications."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete highway camera information including location, technical specifications, and operational details. This schema represents comprehensive camera data from the WSDOT Highway Cameras API, providing essential information for traffic monitoring, navigation applications, and transportation management. The camera details are critical for real-time traffic visualization, incident response, and public information systems."
  );

export const cameraArraySchema = z
  .array(cameraSchema)
  .describe(
    "Array of highway camera data for all available cameras across Washington State highways. This collection provides comprehensive camera information that enables traffic monitoring, navigation applications, and transportation management."
  );

export type CameraLocation = z.infer<typeof cameraLocationSchema>;
export type Camera = z.infer<typeof cameraSchema>;

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * React Query hook for getting all highway cameras
 *
 * Returns all available highway cameras from the WSDOT Highway Cameras API.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional query options
 * @returns React Query result containing all camera data
 *
 * @example
 * ```typescript
 * const { data: cameras } = useHighwayCameras({});
 * console.log(cameras?.[0]?.Title); // "I-5 @ NE 85th St"
 * ```
 */
export const useHighwayCameras = (
  params: GetHighwayCamerasParams = {},
  options?: TanStackOptions<Camera[]>
): UseQueryResult<Camera[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "highway-cameras", "getHighwayCameras", params],
    queryFn: () => getHighwayCameras(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

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

const ENDPOINT_BASE =
  "/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/SearchCamerasAsJson";

// ============================================================================
// API FUNCTION
// ============================================================================

/**
 * Search for highway cameras with optional filters
 *
 * Returns filtered highway camera data based on search criteria such as region,
 * state route, or milepost range.
 *
 * @param params - Object containing search parameters
 * @param params.StateRoute - Optional state route number (e.g., "9", "405")
 * @param params.Region - Optional region code (NW, NC, SC, SW, ER, OL, OS, WA)
 * @param params.StartingMilepost - Optional starting milepost for search range
 * @param params.EndingMilepost - Optional ending milepost for search range
 * @returns Promise containing filtered camera data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const cameras = await searchHighwayCameras({ StateRoute: "5" });
 * console.log(cameras[0].Title); // "I-5 @ NE 85th St"
 * ```
 */
export const searchHighwayCameras = async (
  params: SearchHighwayCamerasParams
): Promise<Camera[]> => {
  // Build query string by including only defined values
  const queryParams = new URLSearchParams();
  if (params.StateRoute !== undefined)
    queryParams.append("StateRoute", String(params.StateRoute));
  if (params.Region !== undefined)
    queryParams.append("Region", String(params.Region));
  if (params.StartingMilepost !== undefined)
    queryParams.append("StartingMilepost", String(params.StartingMilepost));
  if (params.EndingMilepost !== undefined)
    queryParams.append("EndingMilepost", String(params.EndingMilepost));

  const endpoint = `${ENDPOINT_BASE}?${queryParams.toString()}`;

  return zodFetch(
    endpoint,
    {
      input: searchHighwayCamerasParamsSchema,
      output: cameraArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const searchHighwayCamerasParamsSchema = z
  .object({
    StateRoute: z
      .string()
      .optional()
      .describe(
        "Optional state route number to filter cameras by. Examples include '5' for I-5, '405' for I-405, '9' for SR 9, or '520' for SR 520. When provided, only cameras on the specified route are returned."
      ),

    Region: z
      .string()
      .optional()
      .describe(
        "Optional region code to filter cameras by geographic area. Valid codes include 'NW' (Northwest), 'NC' (North Central), 'SC' (South Central), 'SW' (Southwest), 'ER' (Eastern), 'OL' (Olympic), 'OS' (Olympic South), and 'WA' (Washington). When provided, only cameras in the specified region are returned."
      ),

    StartingMilepost: z
      .number()
      .optional()
      .describe(
        "Optional starting milepost for defining a search range along a highway. This parameter is typically used in combination with EndingMilepost to find cameras within a specific stretch of road. Mileposts are decimal numbers representing distance from the route's origin point."
      ),

    EndingMilepost: z
      .number()
      .optional()
      .describe(
        "Optional ending milepost for defining a search range along a highway. This parameter is typically used in combination with StartingMilepost to find cameras within a specific stretch of road. Mileposts are decimal numbers representing distance from the route's origin point."
      ),
  })
  .strict()
  .describe(
    "Parameters for searching and filtering highway cameras based on route, region, or milepost range. All parameters are optional and can be combined to create complex search queries."
  );

export type SearchHighwayCamerasParams = z.infer<
  typeof searchHighwayCamerasParamsSchema
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
// REACT QUERY HOOK
// ============================================================================

/**
 * React Query hook for searching highway cameras with filters
 *
 * Returns filtered highway camera data based on search criteria such as region,
 * state route, or milepost range.
 *
 * @param params - Search parameters (StateRoute, Region, StartingMilepost, EndingMilepost)
 * @param params.StateRoute - Optional state route number (e.g., "9", "405")
 * @param params.Region - Optional region code (NW, NC, SC, SW, ER, OL, OS, WA)
 * @param params.StartingMilepost - Optional starting milepost for search range
 * @param params.EndingMilepost - Optional ending milepost for search range
 * @param options - Optional query options
 * @returns React Query result containing filtered camera data
 *
 * @example
 * ```typescript
 * const { data: cameras } = useSearchHighwayCameras({ StateRoute: "5" });
 * console.log(cameras?.[0]?.Title); // "I-5 @ NE 85th St"
 * ```
 */
export const useSearchHighwayCameras = (
  params: SearchHighwayCamerasParams,
  options?: TanStackOptions<Camera[]>
): UseQueryResult<Camera[], Error> => {
  return useQuery<Camera[]>({
    queryKey: ["wsdot", "highway-cameras", "searchHighwayCameras", params],
    queryFn: () => searchHighwayCameras(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

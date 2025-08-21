import { z } from "zod";

/**
 * Input parameter schemas for WSDOT Highway Cameras API
 *
 * This API provides highway camera information including live traffic camera feeds,
 * camera locations, and search capabilities across Washington State highways.
 */

// No input parameters currently needed for getHighwayCameras
// This schema represents an empty parameter object for consistency
export const getHighwayCamerasParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting all highway cameras. The API returns all available highway cameras across Washington State."
  );

// Parameter schema for getHighwayCamera
export const getHighwayCameraParamsSchema = z
  .object({
    cameraID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the specific highway camera to retrieve. This ID is assigned by the WSDOT system and can be obtained from the getHighwayCameras endpoint or other camera listings."
      ),
  })
  .describe(
    "Parameters for retrieving a specific highway camera by its unique identifier"
  );

// Parameter schema for searchHighwayCameras
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

// Export the inferred types for use in API functions
export type GetHighwayCamerasParams = z.infer<
  typeof getHighwayCamerasParamsSchema
>;
export type GetHighwayCameraParams = z.infer<
  typeof getHighwayCameraParamsSchema
>;
export type SearchHighwayCamerasParams = z.infer<
  typeof searchHighwayCamerasParamsSchema
>;

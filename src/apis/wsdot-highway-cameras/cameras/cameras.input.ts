import { z } from "zod";

/**
 * Input schema for GetCameras endpoint
 *
 * Provides list of traffic cameras. Coverage Area: Statewide.
 */
export const getCamerasSchema = z
  .object({})
  .describe(
    "Retrieves all highway cameras statewide, returning camera locations, image URLs, status information, and display metadata. Use for traffic monitoring, road condition visibility, and camera feed access."
  );

export type GetCamerasInput = z.infer<typeof getCamerasSchema>;

/**
 * Input schema for SearchCameras endpoint
 *
 * Provides list of traffic cameras. Coverage Area: Statewide.
 */
export const searchCamerasSchema = z
  .object({
    StateRoute: z
      .string()
      .optional()
      .describe(
        "State route identifier for camera filtering, as a route identifier. E.g., '005' for I-5, '090' for I-90. Used to filter cameras by specific highway route."
      ),
    Region: z
      .string()
      .optional()
      .describe(
        "WSDOT region identifier for camera filtering, as a region code. E.g., 'WA' for Washington state cameras. Call GetCameras to retrieve list of valid region options. Used to filter cameras by geographic region."
      ),
    StartingMilepost: z
      .number()
      .nullable()
      .optional()
      .describe(
        "Starting milepost value for milepost range filtering, as a decimal. E.g., '1' for milepost 1, null when not filtering by start milepost. Used with EndingMilepost to filter cameras within milepost range."
      ),
    EndingMilepost: z
      .number()
      .nullable()
      .optional()
      .describe(
        "Ending milepost value for milepost range filtering, as a decimal. E.g., '5' for milepost 5, null when not filtering by end milepost. Used with StartingMilepost to filter cameras within milepost range."
      ),
  })
  .describe(
    "Filters highway cameras by route, region, or milepost range, returning matching camera locations, image URLs, and status information. Use for route-specific or location-specific camera queries."
  );

export type SearchCamerasInput = z.infer<typeof searchCamerasSchema>;

/**
 * Input schema for GetCamera endpoint
 *
 * Provides list of traffic cameras. Coverage Area: Statewide.
 */
export const getCameraSchema = z
  .object({
    CameraID: z
      .number()
      .describe(
        "Unique camera identifier, as an integer ID. E.g., '9818' for Anacortes Airport Fuel Pump camera, '8216' for Arlington Municipal Airport Northwest camera. Used to retrieve specific camera information."
      ),
  })
  .describe(
    "Retrieves specific camera by ID, returning camera location, image URL, status, and display metadata. Use for individual camera lookups and camera detail displays."
  );

export type GetCameraInput = z.infer<typeof getCameraSchema>;

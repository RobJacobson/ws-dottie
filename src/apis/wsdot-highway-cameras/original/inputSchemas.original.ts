import { z } from "zod";

/**
 * Input schema for GetCameras endpoint
 * Coverage Area: Statewide. Provides list of traffic cameras.
 */
export const getCamerasSchema = z.object({});

export type GetCamerasInput = z.infer<typeof getCamerasSchema>;

/**
 * Input schema for SearchCameras endpoint
 * Coverage Area: Statewide. Provides list of traffic cameras.
 */
export const searchCamerasSchema = z.object({
  /** The state route of the camera. */
  StateRoute: z.string().optional().describe("The state route of the camera."),
  /**
   * The region of the camera. Call 'GetCameras' to get a list of valid options.
   */
  Region: z
    .string()
    .optional()
    .describe(
      "The region of the camera. Call 'GetCameras' to get a list of valid options."
    ),
  /** Starting milepost. */
  StartingMilepost: z
    .number()
    .nullable()
    .optional()
    .describe("Starting milepost."),
  /** Ending Milepost. */
  EndingMilepost: z.number().nullable().optional().describe("Ending Milepost."),
});

export type SearchCamerasInput = z.infer<typeof searchCamerasSchema>;

/**
 * Input schema for GetCamera endpoint
 * Coverage Area: Statewide. Provides list of traffic cameras.
 */
export const getCameraSchema = z.object({
  /** An ID of a specific camera. */
  CameraID: z.number().describe("An ID of a specific camera."),
});

export type GetCameraInput = z.infer<typeof getCameraSchema>;

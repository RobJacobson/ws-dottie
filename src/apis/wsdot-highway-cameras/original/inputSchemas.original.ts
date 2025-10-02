import { z } from "zod";

/**
 * Input schema for GetCameras endpoint
 */
export const getCamerasSchema = z.object({});

export type GetCamerasInput = z.infer<typeof getCamerasSchema>;

/**
 * Input schema for SearchCameras endpoint
 */
export const searchCamerasSchema = z.object({
  /** The state route of the camera. */
  StateRoute: z.string().describe("The state route of the camera."),
  /**
   * The region of the camera. Call 'GetCameras' to get a list of valid options.
   */
  Region: z
    .string()
    .describe(
      "The region of the camera. Call 'GetCameras' to get a list of valid options."
    ),
  /** Starting milepost. */
  StartingMilepost: z.number().nullable().describe("Starting milepost."),
  /** Ending Milepost. */
  EndingMilepost: z.number().nullable().describe("Ending Milepost."),
});

export type SearchCamerasInput = z.infer<typeof searchCamerasSchema>;

/**
 * Input schema for GetCamera endpoint
 */
export const getCameraSchema = z.object({
  /** An ID of a specific camera. */
  CameraID: z.number().describe("An ID of a specific camera."),
});

export type GetCameraInput = z.infer<typeof getCameraSchema>;

import { z } from "zod";

/**
 * Input schema for GetCameras endpoint
 */
export const getCamerasInputSchema = z.object({});

export type GetCamerasInput = z.infer<typeof getCamerasInputSchema>;

/**
 * Input schema for SearchCameras endpoint
 */
export const searchCamerasInputSchema = z.object({
  StateRoute: z.string().describe("The state route of the camera."),
  Region: z
    .string()
    .describe(
      "The region of the camera. Call 'GetCameras' to get a list of valid options."
    ),
  StartingMilepost: z.number().nullable().describe("Starting milepost."),
  EndingMilepost: z.number().nullable().describe("Ending Milepost."),
});

export type SearchCamerasInput = z.infer<typeof searchCamerasInputSchema>;

/**
 * Input schema for GetCamera endpoint
 */
export const getCameraInputSchema = z.object({
  CameraID: z.number().describe("An ID of a specific camera."),
});

export type GetCameraInput = z.infer<typeof getCameraInputSchema>;

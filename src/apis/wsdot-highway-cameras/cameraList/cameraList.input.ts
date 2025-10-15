import { z } from "zod";

/**
 * Input schema for GetCameras endpoint
 *
 * Provides list of traffic cameras. Coverage Area: Statewide.
 */
export const getCamerasSchema = z
  .object({})
  .describe("Provides list of traffic cameras. Coverage Area: Statewide.");

export type GetCamerasInput = z.infer<typeof getCamerasSchema>;

/**
 * Input schema for SearchCameras endpoint
 *
 * Provides list of traffic cameras. Coverage Area: Statewide.
 */
export const searchCamerasSchema = z
  .object({
    /** The state route of the camera. */
    StateRoute: z
      .string()
      .optional()
      .describe("The state route of the camera."),
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
    EndingMilepost: z
      .number()
      .nullable()
      .optional()
      .describe("Ending Milepost."),
  })
  .describe("Provides list of traffic cameras. Coverage Area: Statewide.");

export type SearchCamerasInput = z.infer<typeof searchCamerasSchema>;

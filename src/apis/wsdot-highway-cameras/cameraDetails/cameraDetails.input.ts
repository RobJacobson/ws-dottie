import { z } from "zod";

/**
 * Input schema for GetCamera endpoint
 *
 * Provides list of traffic cameras. Coverage Area: Statewide.
 */
export const getCameraSchema = z
  .object({
    /** An ID of a specific camera. */
    CameraID: z.number().describe("An ID of a specific camera."),
  })
  .describe("Provides list of traffic cameras. Coverage Area: Statewide.");

export type GetCameraInput = z.infer<typeof getCameraSchema>;

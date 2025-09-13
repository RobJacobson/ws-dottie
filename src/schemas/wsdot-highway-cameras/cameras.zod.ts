import { z } from "zod";
import { cameraSchema } from "./camera.zod";

/**
 * Cameras schema
 *
 * Coverage Area: Statewide. Provides access to the camera images that appear on our Traffic pages. Currently only supports snap shots (not full video). The available cameras does not change very often.
 */
export const camerasSchema = z
  .array(cameraSchema)
  .describe(
    "Coverage Area: Statewide. Provides access to the camera images that appear on our Traffic pages. Currently only supports snap shots (not full video). The available cameras does not change very often."
  );

/** Cameras type */
export type Cameras = z.infer<typeof camerasSchema>;

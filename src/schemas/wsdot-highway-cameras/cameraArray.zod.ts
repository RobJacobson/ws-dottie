import { z } from "zod";
import { highwayCameraSchema } from "./cameras.zod";

/**
 * CameraArray schema
 *
 * Array of cameras returned by search operations.
 */
export const cameraArraySchema = z
  .array(highwayCameraSchema)
  .describe("Array of cameras returned by search operations.");

/** HighwayCameraArray type */
export type HighwayCameraArray = z.infer<typeof cameraArraySchema>;

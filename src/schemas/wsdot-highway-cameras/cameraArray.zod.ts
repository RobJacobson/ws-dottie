import { z } from "zod";
import { cameraSchema } from "./cameras.zod";

/**
 * CameraArray schema
 *
 * Array of cameras returned by search operations.
 */
export const cameraArraySchema = z
  .array(cameraSchema)
  .describe("Array of cameras returned by search operations.");

/** CameraArray type */
export type CameraArray = z.infer<typeof cameraArraySchema>;

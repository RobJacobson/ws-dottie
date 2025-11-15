import { z } from "@/shared/zod";

export const highwayCamerasInputSchema = z
  .object({})
  .describe("Input parameters for listing all highway cameras statewide.");

export type HighwayCamerasInput = z.infer<typeof highwayCamerasInputSchema>;

export const highwayCamerasByRouteAndMilepostInputSchema = z
  .object({
    StateRoute: z
      .string()
      .optional()
      .describe(
        "State route identifier for filtering cameras (e.g., 'I-5', 'I-90')."
      ),
    Region: z
      .string()
      .optional()
      .describe(
        "WSDOT region code for filtering cameras by geographic region."
      ),
    StartingMilepost: z
      .number()
      .nullable()
      .optional()
      .describe("Starting milepost value for milepost range filtering."),
    EndingMilepost: z
      .number()
      .nullable()
      .optional()
      .describe("Ending milepost value for milepost range filtering."),
  })
  .describe(
    "Input parameters for searching cameras by route, region, or milepost range."
  );

export type HighwayCamerasByRouteAndMilepostInput = z.infer<
  typeof highwayCamerasByRouteAndMilepostInputSchema
>;

export const highwayCameraByCameraIdInputSchema = z
  .object({
    CameraID: z.number().describe("Numeric ID of the camera."),
  })
  .describe("Input parameters for retrieving a specific camera by ID.");

export type HighwayCameraByCameraIdInput = z.infer<
  typeof highwayCameraByCameraIdInputSchema
>;

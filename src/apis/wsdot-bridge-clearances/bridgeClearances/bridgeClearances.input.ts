import { z } from "zod";

/**
 * Schema for GetClearances input parameters (all routes)
 *
 * Bridge clearance information, see disclaimer
 */
export const getClearancesSchema = z
  .object({})
  .describe(
    "Retrieves bridge clearance information for all bridges in the system, returning location data, vertical clearance measurements, route associations, and structure identification. Use for route planning and height-restricted vehicle navigation."
  );

export type GetClearancesInput = z.infer<typeof getClearancesSchema>;

/**
 * Schema for GetClearancesByRoute input parameters
 *
 * Bridge clearance information, see disclaimer
 */
export const getClearancesByRouteSchema = z
  .object({
    Route: z
      .string()
      .describe(
        "State route identifier formatted as three-digit number, as a route identifier. E.g., '005' for I-5, '167' for SR-167, '520' for SR-520. Used to filter bridge clearances for specific highway routes."
      ),
  })
  .describe(
    "Filters bridge clearance information by specific state route, returning location data, vertical clearance measurements, and structure identification for bridges on that route. Use for route-specific height clearance planning."
  );

export type GetClearancesByRouteInput = z.infer<
  typeof getClearancesByRouteSchema
>;

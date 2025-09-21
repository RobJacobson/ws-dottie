import { z } from "zod";

/**
 * Schema for GetBridgeClearances input parameters (all routes)
 */
export const GetBridgeClearancesInputSchema = z.object({});

export type GetBridgeClearancesInput = z.infer<
  typeof GetBridgeClearancesInputSchema
>;

/**
 * Schema for GetBridgeClearancesByRoute input parameters
 */
export const GetBridgeClearancesByRouteInputSchema = z.object({
  Route: z
    .string()
    .describe(
      "Route number to filter bridge clearances by specific highway routes."
    ),
});

export type GetBridgeClearancesByRouteInput = z.infer<
  typeof GetBridgeClearancesByRouteInputSchema
>;

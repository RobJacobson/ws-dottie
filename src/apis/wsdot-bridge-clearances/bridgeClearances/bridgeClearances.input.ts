import { z } from "@/shared/zod";

export const bridgeClearancesInputSchema = z
  .object({})
  .describe(
    "Input parameters for retrieving bridge clearance data for all bridges."
  );

export type BridgeClearancesInput = z.infer<typeof bridgeClearancesInputSchema>;

export const bridgeClearancesByRouteInputSchema = z
  .object({
    Route: z
      .string()
      .describe(
        "State route identifier as three-digit number. E.g., '005' for I-5, '167' for SR-167, '520' for SR-520."
      ),
  })
  .describe(
    "Input parameters for retrieving bridge clearance data filtered by state route."
  );

export type BridgeClearancesByRouteInput = z.infer<
  typeof bridgeClearancesByRouteInputSchema
>;

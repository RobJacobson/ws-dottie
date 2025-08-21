import { z } from "zod";

/**
 * WSF Terminals API Input Parameter Schemas
 *
 * This file contains all input/parameter schemas for the Washington State Ferries
 * Terminals API. These schemas validate the parameters passed to API functions,
 * ensuring type safety and consistent parameter structures.
 */

// ============================================================================
// TERMINAL ID PARAMETER SCHEMAS
// ============================================================================

export const terminalIdParamsSchema = z
  .object({
    terminalId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
  })
  .describe(
    "Base parameters for terminal-specific queries. Used to identify which terminal to retrieve information for."
  );

// ============================================================================
// TYPE EXPORTS
// ============================================================================

// Export all parameter types for use in API functions
export type GetTerminalBasicsByTerminalIdParams = z.infer<
  typeof terminalIdParamsSchema
>;
export type GetTerminalLocationByTerminalIdParams = z.infer<
  typeof terminalIdParamsSchema
>;
export type GetTerminalVerboseByTerminalIdParams = z.infer<
  typeof terminalIdParamsSchema
>;
export type GetTerminalBulletinByTerminalIdParams = z.infer<
  typeof terminalIdParamsSchema
>;
export type GetTerminalTransportByTerminalIdParams = z.infer<
  typeof terminalIdParamsSchema
>;
export type GetTerminalWaitTimesByTerminalIdParams = z.infer<
  typeof terminalIdParamsSchema
>;
export type GetTerminalSailingSpaceByTerminalIdParams = z.infer<
  typeof terminalIdParamsSchema
>;

import { z } from "zod";

/**
 * WSF Schedule API Input Parameter Schemas
 *
 * This file contains all input/parameter schemas for the Washington State Ferries
 * Schedule API. These schemas validate the parameters passed to API functions,
 * ensuring type safety and consistent parameter structures.
 */

// ============================================================================
// BASE PARAMETER SCHEMAS
// ============================================================================

export const tripDateParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve schedule information. This date determines which schedule data is returned."
      ),
  })
  .describe(
    "Base parameters for schedule queries that require a trip date. Used across multiple endpoints to specify when schedule data should be retrieved."
  );

export const routeIdParamsSchema = z
  .object({
    routeId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the ferry route. This ID is used to identify specific routes across the WSF system."
      ),
  })
  .describe(
    "Base parameters for route-specific queries. Used to identify which ferry route to retrieve information for."
  );

export const schedRouteIdParamsSchema = z
  .object({
    schedRouteId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the scheduled route. This ID represents a specific schedule instance for a route."
      ),
  })
  .describe(
    "Base parameters for scheduled route queries. Used to identify which scheduled route to retrieve information for."
  );

// ============================================================================
// TERMINAL PARAMETER SCHEMAS
// ============================================================================

export const getTerminalsParamsSchema = tripDateParamsSchema;

export const getTerminalsAndMatesParamsSchema = tripDateParamsSchema;

export const getTerminalsAndMatesByRouteParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe("The trip date for which to retrieve terminal information."),
    routeId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the ferry route to get terminals for."),
  })
  .describe(
    "Parameters for retrieving terminals and their mates for a specific route and trip date."
  );

export const getTerminalMatesParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe("The trip date for which to retrieve terminal mates."),
    terminalId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the departing terminal."),
  })
  .describe(
    "Parameters for retrieving terminal mates (arriving terminals) for a specific departing terminal and trip date."
  );

// ============================================================================
// ROUTE PARAMETER SCHEMAS
// ============================================================================

export const getRoutesParamsSchema = tripDateParamsSchema;

export const getRoutesByTerminalsParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe("The trip date for which to retrieve route information."),
    departingTerminalId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the departing terminal."),
    arrivingTerminalId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the arriving terminal."),
  })
  .describe(
    "Parameters for retrieving routes between specific terminal pairs on a given trip date."
  );

export const getRoutesWithDisruptionsParamsSchema = tripDateParamsSchema;

export const getRouteDetailsParamsSchema = tripDateParamsSchema;

export const getRouteDetailsByTerminalsParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe("The trip date for which to retrieve route details."),
    departingTerminalId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the departing terminal."),
    arrivingTerminalId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the arriving terminal."),
  })
  .describe(
    "Parameters for retrieving detailed route information between specific terminal pairs on a given trip date."
  );

export const getRouteDetailsByRouteParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe("The trip date for which to retrieve route details."),
    routeId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the ferry route."),
  })
  .describe(
    "Parameters for retrieving detailed route information for a specific route on a given trip date."
  );

// ============================================================================
// SCHEDULED ROUTE PARAMETER SCHEMAS
// ============================================================================

export const getScheduledRoutesBySeasonParamsSchema = z
  .object({
    scheduleId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the schedule season."),
  })
  .describe(
    "Parameters for retrieving scheduled routes for a specific schedule season."
  );

// ============================================================================
// SAILING PARAMETER SCHEMAS
// ============================================================================

export const getSailingsParamsSchema = schedRouteIdParamsSchema;

export const getAllSailingsParamsSchema = schedRouteIdParamsSchema;

// ============================================================================
// TIME ADJUSTMENT PARAMETER SCHEMAS
// ============================================================================

export const getTimeAdjustmentsByRouteParamsSchema = routeIdParamsSchema;

export const getTimeAdjustmentsBySchedRouteParamsSchema =
  schedRouteIdParamsSchema;

// ============================================================================
// SCHEDULE PARAMETER SCHEMAS
// ============================================================================

export const getScheduleByRouteParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe("The trip date for which to retrieve schedule information."),
    routeId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the ferry route."),
  })
  .describe(
    "Parameters for retrieving schedule information for a specific route on a given trip date."
  );

export const getScheduleByTerminalsParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe("The trip date for which to retrieve schedule information."),
    departingTerminalId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the departing terminal."),
    arrivingTerminalId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the arriving terminal."),
  })
  .describe(
    "Parameters for retrieving schedule information between specific terminal pairs on a given trip date."
  );

export const getScheduleTodayByRouteParamsSchema = routeIdParamsSchema;

export const getScheduleTodayByTerminalsParamsSchema = z
  .object({
    departingTerminalId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the departing terminal."),
    arrivingTerminalId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the arriving terminal."),
  })
  .describe(
    "Parameters for retrieving today's schedule information between specific terminal pairs."
  );

// ============================================================================
// ALTERNATIVE FORMAT PARAMETER SCHEMAS
// ============================================================================

export const getAlternativeFormatsParamsSchema = z
  .object({
    subjectName: z
      .string()
      .describe(
        "Name of the subject for which to retrieve alternative format information."
      ),
  })
  .describe(
    "Parameters for retrieving alternative format information for a specific subject."
  );

// ============================================================================
// TYPE EXPORTS
// ============================================================================

// Export all parameter types for use in API functions and queries
export type GetAllSailingsParams = z.infer<typeof getAllSailingsParamsSchema>;
export type GetAlternativeFormatsParams = z.infer<
  typeof getAlternativeFormatsParamsSchema
>;
export type GetRouteDetailsByRouteParams = z.infer<
  typeof getRouteDetailsByRouteParamsSchema
>;
export type GetRouteDetailsByTerminalsParams = z.infer<
  typeof getRouteDetailsByTerminalsParamsSchema
>;
export type GetRouteDetailsParams = z.infer<typeof getRouteDetailsParamsSchema>;
export type GetRoutesByTerminalsParams = z.infer<
  typeof getRoutesByTerminalsParamsSchema
>;
export type GetRoutesParams = z.infer<typeof getRoutesParamsSchema>;
export type GetRoutesWithDisruptionsParams = z.infer<
  typeof getRoutesWithDisruptionsParamsSchema
>;
export type GetSailingsParams = z.infer<typeof getSailingsParamsSchema>;
export type GetScheduleByRouteParams = z.infer<
  typeof getScheduleByRouteParamsSchema
>;
export type GetScheduleByTerminalsParams = z.infer<
  typeof getScheduleByTerminalsParamsSchema
>;
export type GetScheduledRoutesBySeasonParams = z.infer<
  typeof getScheduledRoutesBySeasonParamsSchema
>;
export type GetScheduleTodayByRouteParams = z.infer<
  typeof getScheduleTodayByRouteParamsSchema
>;
export type GetScheduleTodayByTerminalsParams = z.infer<
  typeof getScheduleTodayByTerminalsParamsSchema
>;
export type GetTerminalMatesParams = z.infer<
  typeof getTerminalMatesParamsSchema
>;
export type GetTerminalsAndMatesByRouteParams = z.infer<
  typeof getTerminalsAndMatesByRouteParamsSchema
>;
export type GetTerminalsAndMatesParams = z.infer<
  typeof getTerminalsAndMatesParamsSchema
>;
export type GetTerminalsParams = z.infer<typeof getTerminalsParamsSchema>;
export type GetTimeAdjustmentsByRouteParams = z.infer<
  typeof getTimeAdjustmentsByRouteParamsSchema
>;
export type GetTimeAdjustmentsBySchedRouteParams = z.infer<
  typeof getTimeAdjustmentsBySchedRouteParamsSchema
>;

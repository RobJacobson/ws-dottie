/**
 * @fileoverview WSF Terminals API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Terminals API endpoints.
 */

import { z } from "zod";

/**
 * Schema for CacheFlushDate input parameters
 *
 * Used for retrieving cache flush date information.
 * AccessCode is handled separately and not included in input schemas.
 */
export const cacheFlushDateSchema = z.object({});

export type TerminalsCacheFlushDateInput = z.infer<typeof cacheFlushDateSchema>;

/**
 * Schema for TerminalBasics input parameters
 *
 * Used for retrieving all terminal basic details.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalBasicsSchema = z.object({});

export type TerminalBasicsInput = z.infer<typeof terminalBasicsSchema>;

/**
 * Schema for TerminalBulletins input parameters
 *
 * Used for retrieving all terminal bulletins.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalBulletinsSchema = z.object({});

export type TerminalBulletinsInput = z.infer<typeof terminalBulletinsSchema>;

/**
 * Schema for TerminalLocations input parameters
 *
 * Used for retrieving all terminal locations.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalLocationsSchema = z.object({});

export type TerminalLocationsInput = z.infer<typeof terminalLocationsSchema>;

/**
 * Schema for TerminalSailingSpace input parameters
 *
 * Used for retrieving all terminal sailing space information.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalSailingSpaceSchema = z.object({});

export type TerminalSailingSpaceInput = z.infer<
  typeof terminalSailingSpaceSchema
>;

/**
 * Schema for TerminalTransports input parameters
 *
 * Used for retrieving all terminal transportation options.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalTransportsSchema = z.object({});

export type TerminalTransportsInput = z.infer<typeof terminalTransportsSchema>;

/**
 * Schema for TerminalVerbose input parameters
 *
 * Used for retrieving all terminal verbose details.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalVerboseSchema = z.object({});

export type TerminalVerboseInput = z.infer<typeof terminalVerboseSchema>;

/**
 * Schema for TerminalWaitTimes input parameters
 *
 * Used for retrieving all terminal wait times.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalWaitTimesSchema = z.object({});

export type TerminalWaitTimesInput = z.infer<typeof terminalWaitTimesSchema>;

/**
 * Schema for TerminalBasicsById input parameters
 *
 * Used for retrieving basic terminal information for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalBasicsByIdSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalBasicsByIdInput = z.infer<typeof terminalBasicsByIdSchema>;

/**
 * Schema for TerminalBulletinsById input parameters
 *
 * Used for retrieving terminal bulletins for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalBulletinsByIdSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalBulletinsByIdInput = z.infer<
  typeof terminalBulletinsByIdSchema
>;

/**
 * Schema for TerminalLocationsById input parameters
 *
 * Used for retrieving terminal location information for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalLocationsByIdSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalLocationsByIdInput = z.infer<
  typeof terminalLocationsByIdSchema
>;

/**
 * Schema for TerminalSailingSpaceById input parameters
 *
 * Used for retrieving terminal sailing space information for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalSailingSpaceByIdSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalSailingSpaceByIdInput = z.infer<
  typeof terminalSailingSpaceByIdSchema
>;

/**
 * Schema for TerminalTransportsById input parameters
 *
 * Used for retrieving terminal transportation options for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalTransportsByIdSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalTransportsByIdInput = z.infer<
  typeof terminalTransportsByIdSchema
>;

/**
 * Schema for TerminalVerboseById input parameters
 *
 * Used for retrieving detailed terminal information for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalVerboseByIdSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalVerboseByIdInput = z.infer<
  typeof terminalVerboseByIdSchema
>;

/**
 * Schema for TerminalWaitTimesById input parameters
 *
 * Used for retrieving terminal wait time information for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalWaitTimesByIdSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalWaitTimesByIdInput = z.infer<
  typeof terminalWaitTimesByIdSchema
>;

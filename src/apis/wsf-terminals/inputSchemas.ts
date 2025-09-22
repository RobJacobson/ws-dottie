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
export const cacheFlushDateInputSchema = z.object({});

export type CacheFlushDateInput = z.infer<typeof cacheFlushDateInputSchema>;

/**
 * Schema for TerminalBasics input parameters
 *
 * Used for retrieving all terminal basic details.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalBasicsInputSchema = z.object({});

export type TerminalBasicsInput = z.infer<typeof terminalBasicsInputSchema>;

/**
 * Schema for TerminalBulletins input parameters
 *
 * Used for retrieving all terminal bulletins.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalBulletinsInputSchema = z.object({});

export type TerminalBulletinsInput = z.infer<
  typeof terminalBulletinsInputSchema
>;

/**
 * Schema for TerminalLocations input parameters
 *
 * Used for retrieving all terminal locations.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalLocationsInputSchema = z.object({});

export type TerminalLocationsInput = z.infer<
  typeof terminalLocationsInputSchema
>;

/**
 * Schema for TerminalSailingSpace input parameters
 *
 * Used for retrieving all terminal sailing space information.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalSailingSpaceInputSchema = z.object({});

export type TerminalSailingSpaceInput = z.infer<
  typeof terminalSailingSpaceInputSchema
>;

/**
 * Schema for TerminalTransports input parameters
 *
 * Used for retrieving all terminal transportation options.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalTransportsInputSchema = z.object({});

export type TerminalTransportsInput = z.infer<
  typeof terminalTransportsInputSchema
>;

/**
 * Schema for TerminalVerbose input parameters
 *
 * Used for retrieving all terminal verbose details.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalVerboseInputSchema = z.object({});

export type TerminalVerboseInput = z.infer<typeof terminalVerboseInputSchema>;

/**
 * Schema for TerminalWaitTimes input parameters
 *
 * Used for retrieving all terminal wait times.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalWaitTimesInputSchema = z.object({});

export type TerminalWaitTimesInput = z.infer<
  typeof terminalWaitTimesInputSchema
>;

/**
 * Schema for TerminalBasicsById input parameters
 *
 * Used for retrieving basic terminal information for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalBasicsByIdInputSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalBasicsByIdInput = z.infer<
  typeof terminalBasicsByIdInputSchema
>;

/**
 * Schema for TerminalBulletinsById input parameters
 *
 * Used for retrieving terminal bulletins for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalBulletinsByIdInputSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalBulletinsByIdInput = z.infer<
  typeof terminalBulletinsByIdInputSchema
>;

/**
 * Schema for TerminalLocationsById input parameters
 *
 * Used for retrieving terminal location information for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalLocationsByIdInputSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalLocationsByIdInput = z.infer<
  typeof terminalLocationsByIdInputSchema
>;

/**
 * Schema for TerminalSailingSpaceById input parameters
 *
 * Used for retrieving terminal sailing space information for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalSailingSpaceByIdInputSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalSailingSpaceByIdInput = z.infer<
  typeof terminalSailingSpaceByIdInputSchema
>;

/**
 * Schema for TerminalTransportsById input parameters
 *
 * Used for retrieving terminal transportation options for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalTransportsByIdInputSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalTransportsByIdInput = z.infer<
  typeof terminalTransportsByIdInputSchema
>;

/**
 * Schema for TerminalVerboseById input parameters
 *
 * Used for retrieving detailed terminal information for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalVerboseByIdInputSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalVerboseByIdInput = z.infer<
  typeof terminalVerboseByIdInputSchema
>;

/**
 * Schema for TerminalWaitTimesById input parameters
 *
 * Used for retrieving terminal wait time information for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const terminalWaitTimesByIdInputSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalWaitTimesByIdInput = z.infer<
  typeof terminalWaitTimesByIdInputSchema
>;

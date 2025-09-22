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
export const CacheFlushDateInputSchema = z.object({});

export type CacheFlushDateInput = z.infer<
  typeof CacheFlushDateInputSchema
>;

/**
 * Schema for TerminalBasics input parameters
 *
 * Used for retrieving all terminal basic details.
 * AccessCode is handled separately and not included in input schemas.
 */
export const TerminalBasicsInputSchema = z.object({});

export type TerminalBasicsInput = z.infer<
  typeof TerminalBasicsInputSchema
>;

/**
 * Schema for TerminalBulletins input parameters
 *
 * Used for retrieving all terminal bulletins.
 * AccessCode is handled separately and not included in input schemas.
 */
export const TerminalBulletinsInputSchema = z.object({});

export type TerminalBulletinsInput = z.infer<
  typeof TerminalBulletinsInputSchema
>;

/**
 * Schema for TerminalLocations input parameters
 *
 * Used for retrieving all terminal locations.
 * AccessCode is handled separately and not included in input schemas.
 */
export const TerminalLocationsInputSchema = z.object({});

export type TerminalLocationsInput = z.infer<
  typeof TerminalLocationsInputSchema
>;

/**
 * Schema for TerminalSailingSpace input parameters
 *
 * Used for retrieving all terminal sailing space information.
 * AccessCode is handled separately and not included in input schemas.
 */
export const TerminalSailingSpaceInputSchema = z.object({});

export type TerminalSailingSpaceInput = z.infer<
  typeof TerminalSailingSpaceInputSchema
>;

/**
 * Schema for TerminalTransports input parameters
 *
 * Used for retrieving all terminal transportation options.
 * AccessCode is handled separately and not included in input schemas.
 */
export const TerminalTransportsInputSchema = z.object({});

export type TerminalTransportsInput = z.infer<
  typeof TerminalTransportsInputSchema
>;

/**
 * Schema for TerminalVerbose input parameters
 *
 * Used for retrieving all terminal verbose details.
 * AccessCode is handled separately and not included in input schemas.
 */
export const TerminalVerboseInputSchema = z.object({});

export type TerminalVerboseInput = z.infer<
  typeof TerminalVerboseInputSchema
>;

/**
 * Schema for TerminalWaitTimes input parameters
 *
 * Used for retrieving all terminal wait times.
 * AccessCode is handled separately and not included in input schemas.
 */
export const TerminalWaitTimesInputSchema = z.object({});

export type TerminalWaitTimesInput = z.infer<
  typeof TerminalWaitTimesInputSchema
>;

/**
 * Schema for TerminalBasicsById input parameters
 *
 * Used for retrieving basic terminal information for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const TerminalBasicsByIdInputSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalBasicsByIdInput = z.infer<
  typeof TerminalBasicsByIdInputSchema
>;

/**
 * Schema for TerminalBulletinsById input parameters
 *
 * Used for retrieving terminal bulletins for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const TerminalBulletinsByIdInputSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalBulletinsByIdInput = z.infer<
  typeof TerminalBulletinsByIdInputSchema
>;

/**
 * Schema for TerminalLocationsById input parameters
 *
 * Used for retrieving terminal location information for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const TerminalLocationsByIdInputSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalLocationsByIdInput = z.infer<
  typeof TerminalLocationsByIdInputSchema
>;

/**
 * Schema for TerminalSailingSpaceById input parameters
 *
 * Used for retrieving terminal sailing space information for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const TerminalSailingSpaceByIdInputSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalSailingSpaceByIdInput = z.infer<
  typeof TerminalSailingSpaceByIdInputSchema
>;

/**
 * Schema for TerminalTransportsById input parameters
 *
 * Used for retrieving terminal transportation options for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const TerminalTransportsByIdInputSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalTransportsByIdInput = z.infer<
  typeof TerminalTransportsByIdInputSchema
>;

/**
 * Schema for TerminalVerboseById input parameters
 *
 * Used for retrieving detailed terminal information for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const TerminalVerboseByIdInputSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalVerboseByIdInput = z.infer<
  typeof TerminalVerboseByIdInputSchema
>;

/**
 * Schema for TerminalWaitTimesById input parameters
 *
 * Used for retrieving terminal wait time information for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const TerminalWaitTimesByIdInputSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

export type TerminalWaitTimesByIdInput = z.infer<
  typeof TerminalWaitTimesByIdInputSchema
>;

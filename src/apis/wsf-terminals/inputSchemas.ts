/**
 * @fileoverview WSF Terminals API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Terminals API endpoints.
 */

import { z } from "zod";

/**
 * Schema for GetCacheFlushDate input parameters
 *
 * Used for retrieving cache flush date information.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetCacheFlushDateInputSchema = z.object({});

/**
 * Schema for GetAllTerminalBasicDetails input parameters
 *
 * Used for retrieving all terminal basic details.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetAllTerminalBasicDetailsInputSchema = z.object({});

/**
 * Schema for GetAllTerminalBulletins input parameters
 *
 * Used for retrieving all terminal bulletins.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetAllTerminalBulletinsInputSchema = z.object({});

/**
 * Schema for GetAllTerminalLocations input parameters
 *
 * Used for retrieving all terminal locations.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetAllTerminalLocationsInputSchema = z.object({});

/**
 * Schema for GetAllTerminalSailingSpace input parameters
 *
 * Used for retrieving all terminal sailing space information.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetAllTerminalSailingSpaceInputSchema = z.object({});

/**
 * Schema for GetAllTerminalTransportationOptions input parameters
 *
 * Used for retrieving all terminal transportation options.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetAllTerminalTransportationOptionsInputSchema = z.object({});

/**
 * Schema for GetAllTerminalVerboseDetails input parameters
 *
 * Used for retrieving all terminal verbose details.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetAllTerminalVerboseDetailsInputSchema = z.object({});

/**
 * Schema for GetAllTerminalWaitTimes input parameters
 *
 * Used for retrieving all terminal wait times.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetAllTerminalWaitTimesInputSchema = z.object({});

/**
 * Schema for GetSpecificTerminalBasicDetail input parameters
 *
 * Used for retrieving basic terminal information for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetSpecificTerminalBasicDetailInputSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

/**
 * Schema for GetSpecificTerminalBulletin input parameters
 *
 * Used for retrieving terminal bulletins for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetSpecificTerminalBulletinInputSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

/**
 * Schema for GetSpecificTerminalLocation input parameters
 *
 * Used for retrieving terminal location information for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetSpecificTerminalLocationInputSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

/**
 * Schema for GetSpecificTerminalSailingSpace input parameters
 *
 * Used for retrieving terminal sailing space information for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetSpecificTerminalSailingSpaceInputSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

/**
 * Schema for GetSpecificTerminalTransportationOption input parameters
 *
 * Used for retrieving terminal transportation options for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetSpecificTerminalTransportationOptionInputSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

/**
 * Schema for GetSpecificTerminalVerboseDetail input parameters
 *
 * Used for retrieving detailed terminal information for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetSpecificTerminalVerboseDetailInputSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

/**
 * Schema for GetSpecificTerminalWaitTime input parameters
 *
 * Used for retrieving terminal wait time information for a specific terminal by TerminalID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetSpecificTerminalWaitTimeInputSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
});

// Export types
export type GetCacheFlushDateInput = z.infer<
  typeof GetCacheFlushDateInputSchema
>;
export type GetAllTerminalBasicDetailsInput = z.infer<
  typeof GetAllTerminalBasicDetailsInputSchema
>;
export type GetAllTerminalBulletinsInput = z.infer<
  typeof GetAllTerminalBulletinsInputSchema
>;
export type GetAllTerminalLocationsInput = z.infer<
  typeof GetAllTerminalLocationsInputSchema
>;
export type GetAllTerminalSailingSpaceInput = z.infer<
  typeof GetAllTerminalSailingSpaceInputSchema
>;
export type GetAllTerminalTransportationOptionsInput = z.infer<
  typeof GetAllTerminalTransportationOptionsInputSchema
>;
export type GetAllTerminalVerboseDetailsInput = z.infer<
  typeof GetAllTerminalVerboseDetailsInputSchema
>;
export type GetAllTerminalWaitTimesInput = z.infer<
  typeof GetAllTerminalWaitTimesInputSchema
>;
export type GetSpecificTerminalBasicDetailInput = z.infer<
  typeof GetSpecificTerminalBasicDetailInputSchema
>;
export type GetSpecificTerminalBulletinInput = z.infer<
  typeof GetSpecificTerminalBulletinInputSchema
>;
export type GetSpecificTerminalLocationInput = z.infer<
  typeof GetSpecificTerminalLocationInputSchema
>;
export type GetSpecificTerminalSailingSpaceInput = z.infer<
  typeof GetSpecificTerminalSailingSpaceInputSchema
>;
export type GetSpecificTerminalTransportationOptionInput = z.infer<
  typeof GetSpecificTerminalTransportationOptionInputSchema
>;
export type GetSpecificTerminalVerboseDetailInput = z.infer<
  typeof GetSpecificTerminalVerboseDetailInputSchema
>;
export type GetSpecificTerminalWaitTimeInput = z.infer<
  typeof GetSpecificTerminalWaitTimeInputSchema
>;

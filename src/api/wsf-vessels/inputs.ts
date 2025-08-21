import { z } from "zod";

import { zPositiveInteger } from "@/shared/validation";
import {
  createBatchSizeParam,
  createDateRangeParams,
  createDateRangeRefinement,
  createVesselIdDescription,
  createVesselNameParam,
  createVesselNamesParam,
} from "@/shared/validation/templates";

/**
 * WSF Vessels API Input Parameter Schemas
 *
 * This file contains all input/parameter schemas for the Washington State Ferries
 * Vessels API. These schemas validate function parameters before API calls are made,
 * ensuring type safety and providing rich descriptions for MCP integration.
 */

// ============================================================================
// VESSEL BASICS INPUT SCHEMAS
// ============================================================================

export const getVesselBasicsByIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(
      createVesselIdDescription("whose basic information you want to retrieve")
    ),
  })
  .describe(
    "Parameters for retrieving basic information about a specific vessel by its unique identifier"
  );

// ============================================================================
// VESSEL LOCATIONS INPUT SCHEMAS
// ============================================================================

export const getVesselLocationsByVesselIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(
      createVesselIdDescription(
        "whose location you want to track. This returns real-time GPS coordinates, speed, heading, and operational status"
      )
    ),
  })
  .describe(
    "Parameters for retrieving real-time location data for a specific vessel"
  );

// ============================================================================
// VESSEL ACCOMMODATIONS INPUT SCHEMAS
// ============================================================================

export const getVesselAccommodationsByIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(
      createVesselIdDescription(
        "whose accommodation details you want to retrieve. This returns information about passenger capacity, vehicle capacity, ADA accessibility, amenities like restrooms and Wi-Fi, and other accommodation features"
      )
    ),
  })
  .describe(
    "Parameters for retrieving detailed accommodation information for a specific vessel"
  );

// ============================================================================
// VESSEL STATISTICS INPUT SCHEMAS
// ============================================================================

export const getVesselStatsByIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(
      createVesselIdDescription(
        "whose technical specifications and statistics you want to retrieve. This returns detailed information about the vessel's physical characteristics, capacity, engine specifications, and operational statistics"
      )
    ),
  })
  .describe(
    "Parameters for retrieving comprehensive statistics and specifications for a specific vessel"
  );

// ============================================================================
// VESSEL VERBOSE INPUT SCHEMAS
// ============================================================================

export const getVesselVerboseByIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(
      createVesselIdDescription(
        "whose complete detailed information you want to retrieve. This returns the most comprehensive dataset available, combining basic info, accommodations, statistics, and specifications in a single response"
      )
    ),
  })
  .describe(
    "Parameters for retrieving complete verbose information for a specific vessel"
  );

// ============================================================================
// VESSEL HISTORY INPUT SCHEMAS
// ============================================================================

export const getVesselHistoryByVesselAndDateRangeParamsSchema = z
  .object({
    vesselName: createVesselNameParam("for historical data retrieval"),
    ...createDateRangeParams("the historical data range"),
  })
  .refine(
    createDateRangeRefinement().refine,
    createDateRangeRefinement().errorConfig
  )
  .describe(
    "Parameters for fetching historical operational data for a specific vessel within a date range. Useful for analyzing vessel routes, schedules, and operational patterns over time."
  );

export const getMultipleVesselHistoriesParamsSchema = z
  .object({
    vesselNames: createVesselNamesParam("for historical data retrieval"),
    ...createDateRangeParams(
      "the historical data range for all specified vessels"
    ),
    batchSize: createBatchSizeParam("multiple vessel history", 6, 20),
  })
  .refine(
    createDateRangeRefinement().refine,
    createDateRangeRefinement().errorConfig
  )
  .describe(
    "Parameters for fetching historical operational data for multiple vessels within the same date range. Efficiently retrieves historical data for several vessels with automatic batching to respect server limits."
  );

export const getAllVesselHistoriesParamsSchema = z
  .object({
    ...createDateRangeParams(
      "the historical data range for all vessels in the WSF fleet"
    ),
    batchSize: createBatchSizeParam("all vessel histories", 6, 10),
  })
  .refine(
    createDateRangeRefinement().refine,
    createDateRangeRefinement().errorConfig
  )
  .describe(
    "Parameters for fetching historical operational data for all vessels in the Washington State Ferries fleet within a date range. This is a comprehensive query that retrieves data for all 21 active vessels, so use with caution for large date ranges."
  );

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type GetVesselBasicsByIdParams = z.infer<
  typeof getVesselBasicsByIdParamsSchema
>;
export type GetVesselLocationsByVesselIdParams = z.infer<
  typeof getVesselLocationsByVesselIdParamsSchema
>;
export type GetVesselAccommodationsByIdParams = z.infer<
  typeof getVesselAccommodationsByIdParamsSchema
>;
export type GetVesselStatsByIdParams = z.infer<
  typeof getVesselStatsByIdParamsSchema
>;
export type GetVesselVerboseByIdParams = z.infer<
  typeof getVesselVerboseByIdParamsSchema
>;
export type GetVesselHistoryByVesselAndDateRangeParams = z.infer<
  typeof getVesselHistoryByVesselAndDateRangeParamsSchema
>;
export type GetMultipleVesselHistoriesParams = z.infer<
  typeof getMultipleVesselHistoriesParamsSchema
>;
export type GetAllVesselHistoriesParams = z.infer<
  typeof getAllVesselHistoriesParamsSchema
>;

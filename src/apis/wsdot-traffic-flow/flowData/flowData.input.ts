/**
 * @fileoverview WSDOT Traffic Flow API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSDOT
 * Traffic Flow API endpoints.
 */

import { z } from "zod";

/**
 * Schema for GetTrafficFlow input parameters
 *
 * Provides real-time data on Traffic Flow sensors for the entire state. Data is updated every 90 seconds. Coverage Area: Statewide.
 */
export const getTrafficFlowSchema = z
  .object({
    /** The ID of the station you wish to retrieve. */
    FlowDataID: z
      .number()
      .describe("The ID of the station you wish to retrieve."),
  })
  .describe(
    "Provides real-time data on Traffic Flow sensors for the entire state. Data is updated every 90 seconds. Coverage Area: Statewide."
  );

export type GetTrafficFlowInput = z.infer<typeof getTrafficFlowSchema>;

/**
 * Schema for GetTrafficFlows input parameters
 *
 * Provides real-time data on Traffic Flow sensors for the entire state. Data is updated every 90 seconds. Coverage Area: Statewide.
 */
export const getTrafficFlowsSchema = z
  .object({})
  .describe(
    "Provides real-time data on Traffic Flow sensors for the entire state. Data is updated every 90 seconds. Coverage Area: Statewide."
  );

export type GetTrafficFlowsInput = z.infer<typeof getTrafficFlowsSchema>;

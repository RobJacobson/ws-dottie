/**
 * @fileoverview WSDOT Traffic Flow API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSDOT
 * Traffic Flow API endpoints.
 */

import { z } from "@/shared/zod";

/**
 * Schema for GetTrafficFlow input parameters
 *
 * Provides real-time data on Traffic Flow sensors for the entire state. Data is updated every 90 seconds. Coverage Area: Statewide.
 */
export const trafficFlowByIdInputSchema = z
  .object({
    FlowDataID: z.number().describe("Numeric ID of the traffic flow station."),
  })
  .describe(
    "Input parameters for retrieving traffic flow data for a specific station by ID."
  );

export type TrafficFlowByIdInput = z.infer<typeof trafficFlowByIdInputSchema>;

/**
 * Schema for GetTrafficFlows input parameters
 *
 * Provides real-time data on Traffic Flow sensors for the entire state. Data is updated every 90 seconds. Coverage Area: Statewide.
 */
export const trafficFlowsInputSchema = z
  .object({})
  .describe(
    "Input parameters for retrieving traffic flow data for all stations statewide."
  );

export type TrafficFlowsInput = z.infer<typeof trafficFlowsInputSchema>;

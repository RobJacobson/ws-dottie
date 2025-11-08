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
    FlowDataID: z
      .number()
      .describe(
        "Unique traffic flow station identifier, as an integer ID. E.g., '2482' for Homeacres Rd eastbound station, '4828' for Bickford Ave westbound station. Used to retrieve specific flow station data."
      ),
  })
  .describe(
    "Retrieves real-time traffic flow data for specific station by ID, returning flow reading value, station location, region, and timestamp. Data updated every 90 seconds. Use for individual station monitoring."
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
    "Retrieves real-time traffic flow data for all stations statewide, returning flow reading values, station locations, regions, and timestamps. Data updated every 90 seconds. Use for traffic monitoring and flow analysis across all stations."
  );

export type TrafficFlowsInput = z.infer<typeof trafficFlowsInputSchema>;

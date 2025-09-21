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
 * Used for retrieving traffic flow data for a specific station by FlowDataID.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetTrafficFlowInputSchema = z.object({
  FlowDataID: z
    .number()
    .describe("The ID of the station you wish to retrieve."),
});

export type GetTrafficFlowInput = z.infer<typeof GetTrafficFlowInputSchema>;

/**
 * Schema for GetTrafficFlows input parameters
 *
 * Used for retrieving all traffic flow data. Only requires AccessCode which is
 * handled separately and not included in input schemas.
 */
export const GetTrafficFlowsInputSchema = z.object({});

export type GetTrafficFlowsInput = z.infer<typeof GetTrafficFlowsInputSchema>;

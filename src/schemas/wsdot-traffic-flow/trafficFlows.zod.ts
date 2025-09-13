import { z } from "zod";
import { flowDataSchema } from "./flowData.zod";

/**
 * TrafficFlows schema
 *
 * Array of traffic flow data from WSDOT flow stations.
 */
export const trafficFlowsSchema = z
  .array(flowDataSchema)
  .describe("Array of traffic flow data from WSDOT flow stations.");

/** TrafficFlows type */
export type TrafficFlows = z.infer<typeof trafficFlowsSchema>;

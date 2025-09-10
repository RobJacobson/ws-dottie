import { z } from "zod";
import { roadwayLocationSchema } from "@/schemas/shared/roadwayLocation.zod";
import { zWsdotDate } from "@/shared/tanstack/validation";

/**
 * FlowData schema
 *
 * A data structure that represents a Flow Station.
 */
export const flowDataSchema = z
  .object({
    /** A unique ID that identifies a specific station. */
    FlowDataID: z
      .number()
      .int()
      .describe("A unique ID that identifies a specific station."),
    /** The current traffic condition at the flow station. Possible values: Unknown, WideOpen, Moderate, Heavy, StopAndGo, NoData */
    FlowReadingValue: z
      .enum(["Unknown", "WideOpen", "Moderate", "Heavy", "StopAndGo", "NoData"])
      .describe(
        "The current traffic condition at the flow station. Possible values: Unknown, WideOpen, Moderate, Heavy, StopAndGo, NoData"
      ),
    /** The location of the flow station. */
    FlowStationLocation: roadwayLocationSchema
      .nullable()
      .describe("The location of the flow station."),
    /** The region that maintains the flow station. */
    Region: z
      .string()
      .nullable()
      .describe("The region that maintains the flow station."),
    /** The name of the flow station. */
    StationName: z
      .string()
      .nullable()
      .describe("The name of the flow station."),
    /** The time of the station reading. */
    Time: zWsdotDate().describe("The time of the station reading."),
  })
  .describe("A data structure that represents a Flow Station.");

/**
 * TrafficFlows schema
 *
 * Array of traffic flow data from WSDOT flow stations.
 */
export const trafficFlowsSchema = z
  .array(flowDataSchema)
  .describe("Array of traffic flow data from WSDOT flow stations.");

/** FlowData type */
export type FlowData = z.infer<typeof flowDataSchema>;

/** TrafficFlows type */
export type TrafficFlows = z.infer<typeof trafficFlowsSchema>;

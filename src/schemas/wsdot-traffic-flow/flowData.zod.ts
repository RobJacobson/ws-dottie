import { z } from "zod";
import { zWsdotDate } from "@/apis/shared";
import { roadwayLocationSchema } from "@/schemas/shared/roadwayLocation.zod";

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
    /** The current traffic condition at the flow station. Possible values: 0 = Unknown, 1 = WideOpen, 2 = Moderate, 3 = Heavy, 4 = StopAndGo */
    FlowReadingValue: z
      .union([
        z.literal(0),
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
      ])
      .describe(
        "The current traffic condition at the flow station. Possible values: 0 = Unknown, 1 = WideOpen, 2 = Moderate, 3 = Heavy, 4 = StopAndGo"
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

/** FlowData type */
export type FlowData = z.infer<typeof flowDataSchema>;

/**
 * Array of traffic flow data.
 */
export const trafficFlowsSchema = z
  .array(flowDataSchema)
  .describe("Array of traffic flow data from WSDOT flow stations.");

export type TrafficFlows = z.infer<typeof trafficFlowsSchema>;

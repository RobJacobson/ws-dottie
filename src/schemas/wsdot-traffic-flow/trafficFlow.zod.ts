import { z } from "zod";
import { zWsdotDate } from "@/shared/fetching/validation";
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
      .positive()
      .describe("A unique ID that identifies a specific station."),
    /** The time of the station reading. */
    Time: zWsdotDate().describe("The time of the station reading."),
    /** The name of the flow station. */
    StationName: z.string().describe("The name of the flow station."),
    /** The region that maintains the flow station. */
    Region: z.string().describe("The region that maintains the flow station."),
    /** The location of the flow station. */
    FlowStationLocation: roadwayLocationSchema.describe(
      "The location of the flow station."
    ),
    /** The current traffic condition at the flow station. Possible values: 0 = Unknown 1 = WideOpen 2 = Moderate 3 = Heavy 4 = StopAndGo 5 = NoData */
    FlowReadingValue: z
      .enum(["0", "1", "2", "3", "4", "5"])
      .describe(
        "The current traffic condition at the flow station. Possible values: 0 = Unknown 1 = WideOpen 2 = Moderate 3 = Heavy 4 = StopAndGo 5 = NoData"
      ),
  })
  .describe("A data structure that represents a Flow Station.");

/** FlowData type */
export type FlowData = z.infer<typeof flowDataSchema>;

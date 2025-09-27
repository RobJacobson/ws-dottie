import { z } from "zod";
import { roadwayLocationSchema, zWsdotDate } from "@/apis/shared";

/**
 * Schema for BorderCrossingData - represents border crossing wait time data
 */
export const borderCrossingDataSchema = z.object({
  /** Where the crossing is located. */
  // Synthesized from: Alice (comprehensive integration), Charlie (null data explanation), Bob (clarity)
  BorderCrossingLocation: roadwayLocationSchema
    .nullable()
    .describe(
      "The specific location details for this border crossing lane, including coordinates and highway information (e.g., detailed location data for 'I-5 General Purpose', 'SR 543 Nexus Lane'). This field contains null for specialized lanes like Nexus or truck lanes that share location data with their main crossing (SR539Nexus, SR539Trucks). The null values indicate these lanes share physical infrastructure with the main crossing rather than having independent locations. Use with wsdot-traffic-flow/getTrafficFlow to analyze approach route conditions and wsdot-travel-times/getTravelTimes to calculate total journey time including border wait."
    ),
  /** Common name of the crossing. */
  // Synthesized from: Alice (integration examples), Charlie (lane type clarity), Bob (naming patterns)
  CrossingName: z
    .string()
    .nullable()
    .describe(
      "The unique identifier name for this specific border crossing lane, combining highway designation with lane type (e.g., 'I5' for I-5 general purpose, 'I5Nexus' for I-5 Nexus lane, 'SR543Trucks' for SR-543 commercial vehicle lane, 'SR543TrucksFast' for FAST program lanes). These names distinguish between different lane types at the same physical crossing location, enabling travelers to identify the correct approach lane for their vehicle type and program enrollment. Use with wsdot-commercial-vehicle-restrictions/getCommercialVehicleRestrictions to verify truck access for commercial crossings and wsdot-bridge-clearances/getBridgeClearancesByRoute to check vehicle height restrictions on approach routes."
    ),
  /** When the reading was taken. */
  // Synthesized from: Alice (data freshness context), Bob (update frequency), Charlie (batch collection insight)
  Time: zWsdotDate().describe(
    "The exact timestamp when this wait time reading was recorded, in UTC format (e.g., '2025-09-27T21:30:00.000Z'). All border crossings share identical timestamps indicating automated batch data collection, with readings updated approximately every 10-15 minutes during peak hours and less frequently during low-traffic periods. This timestamp is critical for determining data freshness and reliability for real-time travel decisions."
  ),
  /** Current time to cross border. */
  // Synthesized from: Alice (integration guidance), Charlie (business context), Bob (wait time patterns)
  WaitTime: z
    .number()
    .describe(
      "The estimated wait time to cross this specific border lane, measured in minutes (e.g., '5' for light traffic, '15' for moderate delays, '20+' for heavy congestion). Wait times represent current conditions rather than historical averages, enabling real-time travel decisions. Wait times vary significantly between lane types, with Nexus lanes typically showing shorter waits than general purpose lanes, and commercial vehicle lanes often showing longer waits due to enhanced inspection procedures. Combine with wsdot-travel-times/getTravelTimes to calculate total journey time and wsdot-highway-alerts/getAlerts to check for incidents affecting border approach routes."
    ),
});

export type BorderCrossingData = z.infer<typeof borderCrossingDataSchema>;

/**
 * Schema for BorderCrossingDataList - the main response list
 */
// Synthesized from: Alice (integration focus), Charlie (user segment analysis), Bob (technical accuracy)
export const borderCrossingDataListSchema = z
  .array(borderCrossingDataSchema)
  .describe(
    "Returns an array of border crossing wait time records including current wait times and location details for all active US-Canada border crossings in Washington State (typically 11 total crossing lanes across 4 highway locations: I-5, SR-539, SR-543, and SR-9). Each record represents a specific lane type at a crossing, enabling travelers to compare wait times between general purpose, Nexus, and commercial vehicle lanes for optimal route selection. Data updates approximately every 10-15 minutes during peak hours, providing real-time conditions for cross-border commuters, tourists, commercial drivers, and travel applications. Use with wsdot-traffic-flow/getTrafficFlow and wsdot-travel-times/getTravelTimes for comprehensive route planning that includes both border wait and highway travel times, and wsdot-highway-alerts/getAlerts to check for incidents affecting border approaches."
  );

export type BorderCrossingDataList = z.infer<
  typeof borderCrossingDataListSchema
>;

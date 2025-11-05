import { roadwayLocationSchema, zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod-openapi-init";

/**
 * Schema for Alert - represents a Highway Alert
 *
 * A Highway Alert.
 */
export const alertSchema = z
  .object({
    AlertID: z
      .int()
      .describe(
        "Unique highway alert identifier, as an integer ID. E.g., '669625' for I-405 construction alert, '468632' for SR-520 flammable cargo restriction, '669582' for I-405 collision alert. Used as primary key for alert identification and lookups."
      ),
    County: z
      .string()
      .nullable()
      .describe(
        "County name for countywide alerts, as a county name. E.g., null when alert is route-specific rather than countywide. Used to identify alerts that affect entire county rather than specific routes."
      ),
    EndRoadwayLocation: roadwayLocationSchema
      .nullable()
      .describe(
        "Roadway location where alert ends, as a roadway location object. E.g., I-405 at milepost 22.61 northbound for construction alert end point, SR-520 at milepost 5 both directions for cargo restriction, null when alert is point-specific or end location is unavailable. Provides termination point for alert zone along highway."
      ),
    EndTime: zDotnetDate()
      .nullable()
      .describe(
        "Estimated end time for alert impact, as a UTC datetime. E.g., '2025-11-03T13:00:00.000Z' for alert ending at 1:00 PM on November 3, 2025, null when end time is not estimated or alert is ongoing. Used for alert duration tracking and expected resolution time."
      ),
    EventCategory: z
      .string()
      .nullable()
      .describe(
        "Category classification for alert event, as an event category. E.g., 'Construction' for construction alerts, 'Collision' for traffic accidents, 'Maintenance' for maintenance work, 'Rest Area' for rest area closures, 'Flammable Cargo Restriction' for cargo restrictions, null when category is unavailable. Used for alert type filtering and categorization."
      ),
    EventStatus: z
      .string()
      .nullable()
      .describe(
        "Current operational status of alert, as a status code. Valid values: 'Open' (active), 'Closed' (resolved). E.g., 'Open' for active alerts like construction work, 'Closed' for resolved incidents like cleared collisions, null when status is unavailable. Used to determine if alert is currently active."
      ),
    ExtendedDescription: z
      .string()
      .nullable()
      .describe(
        "Additional detailed information about alert, as a human-readable description. E.g., empty string when extended description is not provided, null when extended description is unavailable. Provides supplementary details beyond headline description for comprehensive alert information."
      ),
    HeadlineDescription: z
      .string()
      .nullable()
      .describe(
        "Primary description of alert issue, as a headline description. E.g., 'Up to three lanes of northbound I-405 will close overnight between Northeast 124th Street and Northeast 160th Street' for construction alert, 'Cleared 12:24 AM : On I-405 northbound just south of SR 520 (MP 14) there is a collision blocking the HOV lane' for collision alert, null when headline is unavailable. Provides main alert information for display and user notification."
      ),
    LastUpdatedTime: zDotnetDate()
      .nullable()
      .describe(
        "Timestamp when alert was last modified or updated, as a UTC datetime. E.g., '2025-11-01T18:18:10.253Z' for update on November 1, 2025 at 6:18 PM, '2025-11-01T07:24:35.000Z' for update at 7:24 AM. Indicates data freshness and when alert information was last changed."
      ),
    Priority: z
      .string()
      .nullable()
      .describe(
        "Expected traffic impact priority level, as a priority code. Valid values: 'Highest' (severe impact), 'High' (significant impact), 'Medium' (moderate impact), 'Low' (minimal impact). E.g., 'Highest' for collisions blocking lanes, 'High' for major closures, 'Low' for minor congestion alerts, null when priority is unavailable. Used for alert prioritization and impact assessment."
      ),
    Region: z
      .string()
      .nullable()
      .describe(
        "WSDOT region code that entered alert, as a region code. Valid values: 'EA' (Eastern), 'NC' (North Central), 'NW' (Northwest), 'OL' (Olympic), 'SC' (South Central), 'SW' (Southwest). E.g., 'NW' for Northwest region alerts, 'EA' for Eastern region alerts, null when region is unavailable. Used for regional alert organization and filtering."
      ),
    StartRoadwayLocation: roadwayLocationSchema
      .nullable()
      .describe(
        "Roadway location where alert begins, as a roadway location object. E.g., I-405 at milepost 20.3 northbound for construction alert start point, SR-520 at milepost 1 both directions for cargo restriction, null when alert is point-specific or start location is unavailable. Provides origin point for alert zone along highway."
      ),
    StartTime: zDotnetDate()
      .nullable()
      .describe(
        "Timestamp when alert impact on traffic began, as a UTC datetime. E.g., '2025-11-01T18:10:00.000Z' for alert starting at 6:10 PM on November 1, 2025, '2025-11-01T07:18:00.000Z' for collision at 7:18 AM. Indicates when alert became active and traffic impact commenced."
      ),
  })
  .describe(
    "Represents highway alert information including alert identification, event category, priority, location data, timestamps, and descriptions. E.g., alert 669625 for I-405 construction (High priority, Open status) from milepost 20.3 to 22.61 northbound starting November 1 at 6:10 PM. Used for traffic incident monitoring, construction awareness, and highway event notifications. Alerts updated in real-time as conditions change."
  );

export type Alert = z.infer<typeof alertSchema>;
